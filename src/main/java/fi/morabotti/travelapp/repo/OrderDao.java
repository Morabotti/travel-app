package fi.morabotti.travelapp.repo;

import fi.jubic.easyconfig.jooq.JooqConfiguration;
import fi.morabotti.travelapp.Configuration;
import fi.morabotti.travelapp.db.Keys;
import fi.morabotti.travelapp.models.api.OrderView;
import fi.morabotti.travelapp.models.api.CustomerView;
import fi.morabotti.travelapp.models.api.TravelView;
import fi.morabotti.travelapp.models.db.OrderMapping;
import org.jooq.Record;
import org.jooq.impl.DSL;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static fi.morabotti.travelapp.db.tables.Customers.CUSTOMERS;
import static fi.morabotti.travelapp.db.tables.Orders.ORDERS;
import static fi.morabotti.travelapp.db.tables.Travels.TRAVELS;

@Singleton
public class OrderDao {
    private final JooqConfiguration jooqConfiguration;

    @Inject
    public OrderDao (Configuration configuration) {
        this.jooqConfiguration = configuration.getJooqConfiguration();
    }

    public List<OrderMapping> fetchAll() {
        return DSL.using(jooqConfiguration.getConfiguration())
                .select()
                .from(ORDERS)
                .leftJoin(CUSTOMERS).onKey(Keys.FK_ORDERS_CUSTOMER_ID)
                .leftJoin(TRAVELS).onKey(Keys.FK_ORDERS_TRAVEL_ID)
                .fetchStream()
                .map(OrderDao::mapToModel)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toList());
    }

    public List<OrderView> fetchAllToView() {
        return DSL.using(jooqConfiguration.getConfiguration())
                .select()
                .from(ORDERS)
                .leftJoin(CUSTOMERS).onKey(Keys.FK_ORDERS_CUSTOMER_ID)
                .leftJoin(TRAVELS).onKey(Keys.FK_ORDERS_TRAVEL_ID)
                .fetchStream()
                .map(OrderDao::mapToView)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toList());
    }

    public Optional<OrderMapping> fetchById(long id) {
        return DSL.using(jooqConfiguration.getConfiguration())
                .select()
                .from(ORDERS)
                .leftJoin(CUSTOMERS).onKey(Keys.FK_ORDERS_CUSTOMER_ID)
                .leftJoin(TRAVELS).onKey(Keys.FK_ORDERS_TRAVEL_ID)
                .where(ORDERS.ID.eq(id))
                .fetchOptional()
                .flatMap(OrderDao::mapToModel);
    }

    public Optional<OrderView> fetchByIdToView(long id) {
        return DSL.using(jooqConfiguration.getConfiguration())
                .select()
                .from(ORDERS)
                .leftJoin(CUSTOMERS).onKey(Keys.FK_ORDERS_CUSTOMER_ID)
                .leftJoin(TRAVELS).onKey(Keys.FK_ORDERS_TRAVEL_ID)
                .where(ORDERS.ID.eq(id))
                .fetchOptional()
                .flatMap(OrderDao::mapToView);
    }

    public Optional<OrderMapping> create(OrderMapping orderMapping) {
        return DSL.using(jooqConfiguration.getConfiguration())
                .insertInto(
                        ORDERS,
                        ORDERS.TRAVEL_ID,
                        ORDERS.CUSTOMER_ID,
                        ORDERS.START_DATE,
                        ORDERS.END_DATE,
                        ORDERS.ACTIVE
                ).values(
                        orderMapping.travelId(),
                        orderMapping.customerId(),
                        orderMapping.startDate(),
                        orderMapping.endDate(),
                        orderMapping.active()
                ).returning()
                .fetchOptional()
                .flatMap(OrderDao::mapToModel);
    }

    public Optional<OrderView> edit(OrderMapping orderMapping) {
        boolean success = DSL.using(jooqConfiguration.getConfiguration())
                .update(ORDERS)
                .set(ORDERS.CUSTOMER_ID, orderMapping.customerId())
                .set(ORDERS.TRAVEL_ID, orderMapping.travelId())
                .set(ORDERS.START_DATE, orderMapping.startDate())
                .set(ORDERS.END_DATE, orderMapping.startDate())
                .set(ORDERS.ACTIVE, orderMapping.active())
                .where(ORDERS.ID.equal(orderMapping.id()))
                .execute() > 0;

        if (!success) {
            return Optional.empty();
        }

        return fetchByIdToView(orderMapping.id());
    }

    public Boolean delete(long id) {
        return DSL.using(jooqConfiguration.getConfiguration())
                .delete(ORDERS)
                .where(ORDERS.ID.eq(id))
                .execute() == 1;
    }


    private static Optional<OrderView> mapToView(Record record) {
        if (record.getValue(ORDERS.ID) == null) {
            return Optional.empty();
        }

        return Optional.of(
                OrderView.builder()
                        .setId(record.getValue(ORDERS.ID))
                        .setStartDate(record.getValue(ORDERS.START_DATE).toString())
                        .setEndDate(record.getValue(ORDERS.START_DATE).toString())
                        .setActive(record.getValue(ORDERS.ACTIVE))
                        .setCustomer(
                                CustomerView.builder()
                                        .setId(record.getValue(CUSTOMERS.ID))
                                        .setFirstName(record.getValue(CUSTOMERS.FIRST_NAME))
                                        .setLastName(record.getValue(CUSTOMERS.LAST_NAME))
                                        .setEmail(record.getValue(CUSTOMERS.EMAIL))
                                        .setAge(record.getValue(CUSTOMERS.AGE))
                                        .setCreated(record.getValue(CUSTOMERS.CREATED).toString())
                                        .build()
                        ).setTravel(
                                TravelView.builder()
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
                        )
                        .build()
        );
    }

    private static Optional<OrderMapping> mapToModel(Record record) {
        if (record.getValue(ORDERS.ID) == null) {
            return Optional.empty();
        }

        return Optional.of(
                OrderMapping.builder()
                        .setId(record.getValue(ORDERS.ID))
                        .setStartDate(record.getValue(ORDERS.START_DATE))
                        .setEndDate(record.getValue(ORDERS.START_DATE))
                        .setActive(record.getValue(ORDERS.ACTIVE))
                        .setCustomerId(record.getValue(ORDERS.CUSTOMER_ID))
                        .setTravelId(record.getValue(ORDERS.TRAVEL_ID))
                        .build()
        );
    }
}
