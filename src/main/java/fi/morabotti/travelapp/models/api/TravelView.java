package fi.morabotti.travelapp.models.api;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import fi.jubic.easyvalue.EasyProperty;
import fi.jubic.easyvalue.EasyValue;

import javax.annotation.Nullable;

@EasyValue
@JsonDeserialize(as = EasyValue_TravelView.class)
@JsonSerialize(as = EasyValue_TravelView.class)
public abstract class TravelView {
    @EasyProperty
    @Nullable
    public abstract Long id();

    @EasyProperty
    public abstract String travelCode();

    @EasyProperty
    public abstract String name();

    @EasyProperty
    public abstract String description();

    @EasyProperty
    public abstract String startingCity();

    @EasyProperty
    public abstract String destinationCity();

    @EasyProperty
    public abstract Boolean guidedTour();

    @EasyProperty
    public abstract Double cost();

    @Nullable
    @EasyProperty
    public abstract String guide();

    @Nullable
    @EasyProperty
    public abstract String travelType();

    public static Builder builder() { return new Builder(); }

    public abstract Builder toBuilder();

    public static class Builder extends EasyValue_TravelView.Builder {}
}
