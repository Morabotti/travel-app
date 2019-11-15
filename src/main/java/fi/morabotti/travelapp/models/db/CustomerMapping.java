package fi.morabotti.travelapp.models.db;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import fi.jubic.easyvalue.EasyProperty;
import fi.jubic.easyvalue.EasyValue;

import javax.annotation.Nullable;
import java.sql.Timestamp;

@EasyValue
@JsonDeserialize(as = EasyValue_CustomerMapping.class)
@JsonSerialize(as = EasyValue_CustomerMapping.class)
public abstract class CustomerMapping {
    @EasyProperty
    public abstract Long id();

    @EasyProperty
    public abstract String firstName();

    @EasyProperty
    public abstract String lastName();

    @EasyProperty
    public abstract String email();

    @EasyProperty
    public abstract Integer age();

    @EasyProperty
    @Nullable
    public abstract Timestamp created();

    public static Builder builder() { return new Builder(); }

    public abstract Builder toBuilder();

    public static class Builder extends EasyValue_CustomerMapping.Builder {}
}
