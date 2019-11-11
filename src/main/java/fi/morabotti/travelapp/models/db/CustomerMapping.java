package fi.morabotti.travelapp.models.db;

import fi.jubic.easyvalue.EasyProperty;
import fi.jubic.easyvalue.EasyValue;

@EasyValue(excludeJson = true)
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
    public abstract String created();

    public static Builder builder() { return new Builder(); }

    public abstract Builder toBuilder();

    public static class Builder extends EasyValue_CustomerMapping.Builder {}
}
