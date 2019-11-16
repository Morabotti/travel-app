package fi.morabotti.travelapp.repo;

import fi.morabotti.travelapp.models.db.CustomerMapping;
import fi.jubic.easyconfig.jooq.JooqConfiguration;
import fi.morabotti.travelapp.Configuration;
import org.jooq.impl.DSL;
import org.jooq.Record;

import java.sql.SQLException;
import java.util.stream.Collectors;
import java.util.Optional;
import java.util.List;
import javax.inject.Singleton;
import javax.inject.Inject;

import static fi.morabotti.travelapp.db.tables.Customers.CUSTOMERS;
import static fi.morabotti.travelapp.db.tables.Orders.ORDERS;

@Singleton
public class CustomerDao {
    private final JooqConfiguration jooqConfiguration;

    @Inject
    public CustomerDao (Configuration configuration) {
        this.jooqConfiguration = configuration.getJooqConfiguration();
    }

    public List<CustomerMapping> fetchAll() {
        return DSL.using(jooqConfiguration.getConfiguration())
                .select(CUSTOMERS.fields())
                .from(CUSTOMERS)
                .fetch()
                .stream()
                .map(CustomerDao::mapToModel)
                .map(Optional::get)
                .collect(Collectors.toList());
    }

    public Optional<CustomerMapping> fetchById(Long id) {
        return DSL.using(jooqConfiguration.getConfiguration())
                .select(CUSTOMERS.fields())
                .from(CUSTOMERS)
                .where(CUSTOMERS.ID.eq(id))
                .fetchOptional()
                .flatMap(CustomerDao::mapToModel);
    }

    public Optional<CustomerMapping> create(CustomerMapping customerMapping) {
        return DSL.using(jooqConfiguration.getConfiguration())
                .insertInto(
                        CUSTOMERS,
                        CUSTOMERS.FIRST_NAME,
                        CUSTOMERS.LAST_NAME,
                        CUSTOMERS.EMAIL,
                        CUSTOMERS.AGE
                ).values(
                        customerMapping.firstName(),
                        customerMapping.lastName(),
                        customerMapping.email(),
                        customerMapping.age()
                ).returning()
                .fetchOptional()
                .flatMap(CustomerDao::mapToModel);
    }

    public Optional<CustomerMapping> edit(CustomerMapping customerMapping) {
        boolean success = DSL.using(jooqConfiguration.getConfiguration())
                .update(CUSTOMERS)
                .set(CUSTOMERS.FIRST_NAME, customerMapping.firstName())
                .set(CUSTOMERS.LAST_NAME, customerMapping.lastName())
                .set(CUSTOMERS.EMAIL, customerMapping.email())
                .set(CUSTOMERS.AGE, customerMapping.age())
                .where(CUSTOMERS.ID.equal(customerMapping.id()))
                .execute() > 0;

        if (!success) {
            return Optional.empty();
        }

        return fetchById(customerMapping.id());
    }

    public Boolean delete(long id) {
        return DSL.using(jooqConfiguration.getConfiguration())
                .transactionResult(c -> {
                    int hasOrders = DSL.using(c)
                            .selectCount()
                            .from(ORDERS)
                            .where(ORDERS.CUSTOMER_ID.equal(id))
                            .fetchOne(0, int.class);

                    if (hasOrders > 0) {
                        boolean successful = DSL.using(c)
                                .delete(ORDERS)
                                .where(ORDERS.CUSTOMER_ID.eq(id))
                                .execute() == hasOrders;

                        if (!successful) {
                            throw new SQLException("Failed to remove orders");
                        }
                    }

                    return DSL.using(c)
                            .delete(CUSTOMERS)
                            .where(CUSTOMERS.ID.eq(id))
                            .execute() == 1;
                });
    }

    public boolean validateEmail(String email) {
        return DSL.using(jooqConfiguration.getConfiguration())
                .select(CUSTOMERS.EMAIL)
                .from(CUSTOMERS)
                .where(CUSTOMERS.EMAIL.eq(email))
                .fetchOptional()
                .isPresent();
    }

    private static Optional<CustomerMapping> mapToModel(Record record) {
        if (record.getValue(CUSTOMERS.ID) == null) {
            return Optional.empty();
        }

        return Optional.of(
                CustomerMapping.builder()
                        .setId(record.getValue(CUSTOMERS.ID))
                        .setFirstName(record.getValue(CUSTOMERS.FIRST_NAME))
                        .setLastName(record.getValue(CUSTOMERS.LAST_NAME))
                        .setEmail(record.getValue(CUSTOMERS.EMAIL))
                        .setAge(record.getValue(CUSTOMERS.AGE))
                        .setCreated(record.getValue(CUSTOMERS.CREATED))
                        .build()
        );
    }
}
