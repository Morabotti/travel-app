package fi.morabotti.travelapp.models.api;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import fi.jubic.easyvalue.EasyProperty;
import fi.jubic.easyvalue.EasyValue;

@EasyValue
@JsonDeserialize(as = EasyValue_OrderView.class)
@JsonSerialize(as = EasyValue_OrderView.class)
public abstract class OrderView {
    @EasyProperty
    public abstract Long id();

    @EasyProperty
    public abstract CustomerView customer();

    @EasyProperty
    public abstract TravelView travel();

    @EasyProperty
    public abstract String startDate();

    @EasyProperty
    public abstract String endDate();

    @EasyProperty
    public abstract Boolean active();

    public static Builder builder() { return new Builder(); }

    public abstract Builder toBuilder();

    public static class Builder extends EasyValue_OrderView.Builder {}
}
