package fi.morabotti.travelapp.models;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import fi.jubic.easyvalue.EasyProperty;
import fi.jubic.easyvalue.EasyValue;

@EasyValue
@JsonDeserialize(as = EasyValue_CustomerView.class)
@JsonSerialize(as = EasyValue_CustomerView.class)
public abstract class CustomerView {
    @EasyProperty
    public abstract String firstName();

    @EasyProperty
    public abstract String lastName();

    @EasyProperty
    public abstract String email();

    @EasyProperty
    public abstract Integer age();

    public static Builder builder() { return new Builder(); }

    public abstract Builder toBuilder();

    public static class Builder extends EasyValue_CustomerView.Builder {}
}
