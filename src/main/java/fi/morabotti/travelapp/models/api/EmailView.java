package fi.morabotti.travelapp.models.api;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import fi.jubic.easyvalue.EasyProperty;
import fi.jubic.easyvalue.EasyValue;

@EasyValue
@JsonDeserialize(as = EasyValue_EmailView.class)
@JsonSerialize(as = EasyValue_EmailView.class)
public abstract class EmailView {
    @EasyProperty
    public abstract String email();

    public static Builder builder() { return new Builder(); }

    public abstract Builder toBuilder();

    public static class Builder extends EasyValue_EmailView.Builder {}
}
