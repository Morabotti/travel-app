/*
 * This file is generated by jOOQ.
 */
package fi.morabotti.travelapp.db.tables.records;


import fi.morabotti.travelapp.db.tables.Travels;

import javax.annotation.Generated;

import org.jooq.Field;
import org.jooq.Record1;
import org.jooq.Record10;
import org.jooq.Row10;
import org.jooq.impl.UpdatableRecordImpl;


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
public class TravelsRecord extends UpdatableRecordImpl<TravelsRecord> implements Record10<Long, String, String, String, String, String, Boolean, Integer, String, String> {

    private static final long serialVersionUID = -1241787526;

    /**
     * Setter for <code>travelapp.travels.id</code>.
     */
    public void setId(Long value) {
        set(0, value);
    }

    /**
     * Getter for <code>travelapp.travels.id</code>.
     */
    public Long getId() {
        return (Long) get(0);
    }

    /**
     * Setter for <code>travelapp.travels.travel_code</code>.
     */
    public void setTravelCode(String value) {
        set(1, value);
    }

    /**
     * Getter for <code>travelapp.travels.travel_code</code>.
     */
    public String getTravelCode() {
        return (String) get(1);
    }

    /**
     * Setter for <code>travelapp.travels.name</code>.
     */
    public void setName(String value) {
        set(2, value);
    }

    /**
     * Getter for <code>travelapp.travels.name</code>.
     */
    public String getName() {
        return (String) get(2);
    }

    /**
     * Setter for <code>travelapp.travels.description</code>.
     */
    public void setDescription(String value) {
        set(3, value);
    }

    /**
     * Getter for <code>travelapp.travels.description</code>.
     */
    public String getDescription() {
        return (String) get(3);
    }

    /**
     * Setter for <code>travelapp.travels.starting_city</code>.
     */
    public void setStartingCity(String value) {
        set(4, value);
    }

    /**
     * Getter for <code>travelapp.travels.starting_city</code>.
     */
    public String getStartingCity() {
        return (String) get(4);
    }

    /**
     * Setter for <code>travelapp.travels.destination_city</code>.
     */
    public void setDestinationCity(String value) {
        set(5, value);
    }

    /**
     * Getter for <code>travelapp.travels.destination_city</code>.
     */
    public String getDestinationCity() {
        return (String) get(5);
    }

    /**
     * Setter for <code>travelapp.travels.guided_tour</code>.
     */
    public void setGuidedTour(Boolean value) {
        set(6, value);
    }

    /**
     * Getter for <code>travelapp.travels.guided_tour</code>.
     */
    public Boolean getGuidedTour() {
        return (Boolean) get(6);
    }

    /**
     * Setter for <code>travelapp.travels.cost</code>.
     */
    public void setCost(Integer value) {
        set(7, value);
    }

    /**
     * Getter for <code>travelapp.travels.cost</code>.
     */
    public Integer getCost() {
        return (Integer) get(7);
    }

    /**
     * Setter for <code>travelapp.travels.guide</code>.
     */
    public void setGuide(String value) {
        set(8, value);
    }

    /**
     * Getter for <code>travelapp.travels.guide</code>.
     */
    public String getGuide() {
        return (String) get(8);
    }

    /**
     * Setter for <code>travelapp.travels.travel_type</code>.
     */
    public void setTravelType(String value) {
        set(9, value);
    }

    /**
     * Getter for <code>travelapp.travels.travel_type</code>.
     */
    public String getTravelType() {
        return (String) get(9);
    }

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    /**
     * {@inheritDoc}
     */
    @Override
    public Record1<Long> key() {
        return (Record1) super.key();
    }

    // -------------------------------------------------------------------------
    // Record10 type implementation
    // -------------------------------------------------------------------------

    /**
     * {@inheritDoc}
     */
    @Override
    public Row10<Long, String, String, String, String, String, Boolean, Integer, String, String> fieldsRow() {
        return (Row10) super.fieldsRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Row10<Long, String, String, String, String, String, Boolean, Integer, String, String> valuesRow() {
        return (Row10) super.valuesRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Long> field1() {
        return Travels.TRAVELS.ID;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field2() {
        return Travels.TRAVELS.TRAVEL_CODE;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field3() {
        return Travels.TRAVELS.NAME;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field4() {
        return Travels.TRAVELS.DESCRIPTION;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field5() {
        return Travels.TRAVELS.STARTING_CITY;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field6() {
        return Travels.TRAVELS.DESTINATION_CITY;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Boolean> field7() {
        return Travels.TRAVELS.GUIDED_TOUR;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Integer> field8() {
        return Travels.TRAVELS.COST;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field9() {
        return Travels.TRAVELS.GUIDE;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field10() {
        return Travels.TRAVELS.TRAVEL_TYPE;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Long component1() {
        return getId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String component2() {
        return getTravelCode();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String component3() {
        return getName();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String component4() {
        return getDescription();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String component5() {
        return getStartingCity();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String component6() {
        return getDestinationCity();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Boolean component7() {
        return getGuidedTour();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Integer component8() {
        return getCost();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String component9() {
        return getGuide();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String component10() {
        return getTravelType();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Long value1() {
        return getId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value2() {
        return getTravelCode();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value3() {
        return getName();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value4() {
        return getDescription();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value5() {
        return getStartingCity();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value6() {
        return getDestinationCity();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Boolean value7() {
        return getGuidedTour();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Integer value8() {
        return getCost();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value9() {
        return getGuide();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value10() {
        return getTravelType();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public TravelsRecord value1(Long value) {
        setId(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public TravelsRecord value2(String value) {
        setTravelCode(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public TravelsRecord value3(String value) {
        setName(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public TravelsRecord value4(String value) {
        setDescription(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public TravelsRecord value5(String value) {
        setStartingCity(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public TravelsRecord value6(String value) {
        setDestinationCity(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public TravelsRecord value7(Boolean value) {
        setGuidedTour(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public TravelsRecord value8(Integer value) {
        setCost(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public TravelsRecord value9(String value) {
        setGuide(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public TravelsRecord value10(String value) {
        setTravelType(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public TravelsRecord values(Long value1, String value2, String value3, String value4, String value5, String value6, Boolean value7, Integer value8, String value9, String value10) {
        value1(value1);
        value2(value2);
        value3(value3);
        value4(value4);
        value5(value5);
        value6(value6);
        value7(value7);
        value8(value8);
        value9(value9);
        value10(value10);
        return this;
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached TravelsRecord
     */
    public TravelsRecord() {
        super(Travels.TRAVELS);
    }

    /**
     * Create a detached, initialised TravelsRecord
     */
    public TravelsRecord(Long id, String travelCode, String name, String description, String startingCity, String destinationCity, Boolean guidedTour, Integer cost, String guide, String travelType) {
        super(Travels.TRAVELS);

        set(0, id);
        set(1, travelCode);
        set(2, name);
        set(3, description);
        set(4, startingCity);
        set(5, destinationCity);
        set(6, guidedTour);
        set(7, cost);
        set(8, guide);
        set(9, travelType);
    }
}
