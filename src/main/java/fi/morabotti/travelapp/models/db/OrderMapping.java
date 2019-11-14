package fi.morabotti.travelapp.models.db;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import fi.jubic.easyvalue.EasyProperty;
import fi.jubic.easyvalue.EasyValue;

@EasyValue
@JsonDeserialize(as = EasyValue_OrderMapping.class)
@JsonSerialize(as = EasyValue_OrderMapping.class)
public abstract class OrderMapping {
    @EasyProperty
    public abstract Long id();

    @EasyProperty
    public abstract CustomerMapping customer();

    @EasyProperty
    public abstract TravelMapping travel();

    @EasyProperty
    public abstract String startDate();

    @EasyProperty
    public abstract String endDate();

    @EasyProperty
    public abstract Boolean active();

    public static Builder builder() { return new Builder(); }

    public abstract Builder toBuilder();

    public static class Builder extends EasyValue_OrderMapping.Builder {}
}
