package fi.morabotti.travelapp.repo;

import fi.jubic.easyconfig.jooq.JooqConfiguration;
import fi.morabotti.travelapp.Configuration;
import fi.morabotti.travelapp.models.db.TravelMapping;
import org.jooq.Record;
import org.jooq.impl.DSL;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static fi.morabotti.travelapp.db.tables.Travels.TRAVELS;
import static fi.morabotti.travelapp.db.tables.Orders.ORDERS;

@Singleton
public class TravelDao {
    private final JooqConfiguration jooqConfiguration;

    @Inject
    public TravelDao (Configuration configuration) {
        this.jooqConfiguration = configuration.getJooqConfiguration();
    }

    public List<TravelMapping> fetchAll() {
        return DSL.using(jooqConfiguration.getConfiguration())
                .select(TRAVELS.fields())
                .from(TRAVELS)
                .fetch()
                .stream()
                .map(TravelDao::mapToModel)
                .map(Optional::get)
                .collect(Collectors.toList());
    }

    public Optional<TravelMapping> fetchById(Long id) {
        return DSL.using(jooqConfiguration.getConfiguration())
                .select(TRAVELS.fields())
                .from(TRAVELS)
                .where(TRAVELS.ID.eq(id))
                .fetchOptional()
                .flatMap(TravelDao::mapToModel);
    }

    public Optional<TravelMapping> create(TravelMapping travelMapping) {
        return DSL.using(jooqConfiguration.getConfiguration())
                .insertInto(
                        TRAVELS,
                        TRAVELS.TRAVEL_CODE,
                        TRAVELS.NAME,
                        TRAVELS.DESCRIPTION,
                        TRAVELS.STARTING_CITY,
                        TRAVELS.DESTINATION_CITY,
                        TRAVELS.GUIDED_TOUR,
                        TRAVELS.COST,
                        TRAVELS.GUIDE,
                        TRAVELS.TRAVEL_TYPE
                ).values(
                        travelMapping.travelCode(),
                        travelMapping.name(),
                        travelMapping.description(),
                        travelMapping.startingCity(),
                        travelMapping.destinationCity(),
                        travelMapping.guidedTour(),
                        travelMapping.cost(),
                        travelMapping.guide(),
                        travelMapping.travelType()
                ).returning()
                .fetchOptional()
                .flatMap(TravelDao::mapToModel);
    }

    public Optional<TravelMapping> edit(TravelMapping travelMapping) {
        boolean success = DSL.using(jooqConfiguration.getConfiguration())
                .update(TRAVELS)
                .set(TRAVELS.TRAVEL_CODE, travelMapping.travelCode())
                .set(TRAVELS.NAME, travelMapping.name())
                .set(TRAVELS.DESCRIPTION, travelMapping.description())
                .set(TRAVELS.STARTING_CITY, travelMapping.startingCity())
                .set(TRAVELS.DESTINATION_CITY, travelMapping.destinationCity())
                .set(TRAVELS.GUIDED_TOUR, travelMapping.guidedTour())
                .set(TRAVELS.COST, travelMapping.cost())
                .set(TRAVELS.GUIDE, travelMapping.guide())
                .set(TRAVELS.TRAVEL_TYPE, travelMapping.travelType())
                .where(TRAVELS.ID.equal(travelMapping.id()))
                .execute() > 0;

        if (!success) {
            return Optional.empty();
        }

        return fetchById(travelMapping.id());
    }

    public Boolean delete(TravelMapping travelMapping, boolean deleteOrders) {
        return DSL.using(jooqConfiguration.getConfiguration())
                .transactionResult(c -> {
                    if (deleteOrders) {
                        int hasOrders = DSL.using(c)
                                .selectCount()
                                .from(ORDERS)
                                .where(ORDERS.TRAVEL_ID.equal(travelMapping.id()))
                                .fetchOne(0, int.class);

                        if (hasOrders > 0) {
                            boolean successful = DSL.using(c)
                                    .delete(ORDERS)
                                    .where(ORDERS.TRAVEL_ID.eq(travelMapping.id()))
                                    .execute() == hasOrders;

                            if (!successful) {
                                throw new SQLException("Failed to remove orders");
                            }
                        }
                    }

                    return DSL.using(c)
                            .delete(TRAVELS)
                            .where(TRAVELS.ID.eq(travelMapping.id()))
                            .execute() == 1;
                });
    }

    private static Optional<TravelMapping> mapToModel(Record record) {
        if (record.getValue(TRAVELS.ID) == null) {
            return Optional.empty();
        }

        return Optional.of(
                TravelMapping.builder()
                        .setId(record.getValue(TRAVELS.ID))
                        .setTravelCode(record.getValue(TRAVELS.TRAVEL_CODE))
                        .setName(record.getValue(TRAVELS.NAME))
                        .setDescription(record.getValue(TRAVELS.DESCRIPTION))
                        .setStartingCity(record.getValue(TRAVELS.STARTING_CITY))
                        .setDestinationCity(record.getValue(TRAVELS.DESTINATION_CITY))
                        .setGuidedTour(record.getValue(TRAVELS.GUIDED_TOUR))
                        .setCost(record.getValue(TRAVELS.COST))
                        .setGuide(record.getValue(TRAVELS.GUIDE))
                        .setTravelType(record.getValue(TRAVELS.TRAVEL_TYPE))
                        .build()
        );
    }
}