/*
 * This file is generated by jOOQ.
 */
package fi.morabotti.travelapp.db.tables;


import fi.morabotti.travelapp.db.Indexes;
import fi.morabotti.travelapp.db.Keys;
import fi.morabotti.travelapp.db.Travelapp;
import fi.morabotti.travelapp.db.tables.records.CustomersRecord;

import java.sql.Timestamp;
import java.util.Arrays;
import java.util.List;

import javax.annotation.Generated;

import org.jooq.Field;
import org.jooq.ForeignKey;
import org.jooq.Identity;
import org.jooq.Index;
import org.jooq.Name;
import org.jooq.Record;
import org.jooq.Schema;
import org.jooq.Table;
import org.jooq.TableField;
import org.jooq.UniqueKey;
import org.jooq.impl.DSL;
import org.jooq.impl.TableImpl;


/**
 * This class is generated by jOOQ.
 */
@Generated(
    value = {
        "http://www.jooq.org",
        "jOOQ version:3.11.11"
    },
    comments = "This class is generated by jOOQ"
)
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class Customers extends TableImpl<CustomersRecord> {

    private static final long serialVersionUID = 1849019974;

    /**
     * The reference instance of <code>travelapp.customers</code>
     */
    public static final Customers CUSTOMERS = new Customers();

    /**
     * The class holding records for this type
     */
    @Override
    public Class<CustomersRecord> getRecordType() {
        return CustomersRecord.class;
    }

    /**
     * The column <code>travelapp.customers.id</code>.
     */
    public final TableField<CustomersRecord, Long> ID = createField("id", org.jooq.impl.SQLDataType.BIGINT.nullable(false).identity(true), this, "");

    /**
     * The column <code>travelapp.customers.first_name</code>.
     */
    public final TableField<CustomersRecord, String> FIRST_NAME = createField("first_name", org.jooq.impl.SQLDataType.VARCHAR(255).nullable(false), this, "");

    /**
     * The column <code>travelapp.customers.last_name</code>.
     */
    public final TableField<CustomersRecord, String> LAST_NAME = createField("last_name", org.jooq.impl.SQLDataType.VARCHAR(255).nullable(false), this, "");

    /**
     * The column <code>travelapp.customers.email</code>.
     */
    public final TableField<CustomersRecord, String> EMAIL = createField("email", org.jooq.impl.SQLDataType.VARCHAR(255).nullable(false), this, "");

    /**
     * The column <code>travelapp.customers.age</code>.
     */
    public final TableField<CustomersRecord, Integer> AGE = createField("age", org.jooq.impl.SQLDataType.INTEGER.nullable(false), this, "");

    /**
     * The column <code>travelapp.customers.created</code>.
     */
    public final TableField<CustomersRecord, Timestamp> CREATED = createField("created", org.jooq.impl.SQLDataType.TIMESTAMP.nullable(false).defaultValue(org.jooq.impl.DSL.field("current_timestamp()", org.jooq.impl.SQLDataType.TIMESTAMP)), this, "");

    /**
     * Create a <code>travelapp.customers</code> table reference
     */
    public Customers() {
        this(DSL.name("customers"), null);
    }

    /**
     * Create an aliased <code>travelapp.customers</code> table reference
     */
    public Customers(String alias) {
        this(DSL.name(alias), CUSTOMERS);
    }

    /**
     * Create an aliased <code>travelapp.customers</code> table reference
     */
    public Customers(Name alias) {
        this(alias, CUSTOMERS);
    }

    private Customers(Name alias, Table<CustomersRecord> aliased) {
        this(alias, aliased, null);
    }

    private Customers(Name alias, Table<CustomersRecord> aliased, Field<?>[] parameters) {
        super(alias, null, aliased, parameters, DSL.comment(""));
    }

    public <O extends Record> Customers(Table<O> child, ForeignKey<O, CustomersRecord> key) {
        super(child, key, CUSTOMERS);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Schema getSchema() {
        return Travelapp.TRAVELAPP;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Index> getIndexes() {
        return Arrays.<Index>asList(Indexes.CUSTOMERS_EMAIL, Indexes.CUSTOMERS_PRIMARY);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Identity<CustomersRecord, Long> getIdentity() {
        return Keys.IDENTITY_CUSTOMERS;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public UniqueKey<CustomersRecord> getPrimaryKey() {
        return Keys.KEY_CUSTOMERS_PRIMARY;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<UniqueKey<CustomersRecord>> getKeys() {
        return Arrays.<UniqueKey<CustomersRecord>>asList(Keys.KEY_CUSTOMERS_PRIMARY, Keys.KEY_CUSTOMERS_EMAIL);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Customers as(String alias) {
        return new Customers(DSL.name(alias), this);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Customers as(Name alias) {
        return new Customers(alias, this);
    }

    /**
     * Rename this table
     */
    @Override
    public Customers rename(String name) {
        return new Customers(DSL.name(name), null);
    }

    /**
     * Rename this table
     */
    @Override
    public Customers rename(Name name) {
        return new Customers(name, null);
    }
}
