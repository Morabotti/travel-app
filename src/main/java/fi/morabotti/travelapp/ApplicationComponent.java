package fi.morabotti.travelapp;

import dagger.Component;
import dagger.Module;
import dagger.Provides;

import fi.jubic.easyconfig.ConfigMapper;
import fi.jubic.easyconfig.MappingException;

import javax.inject.Singleton;

@Singleton
@Component(modules = {
        ApplicationComponent.ApplicationModule.class
})
public interface ApplicationComponent {
    Application getApplication();

    @Module
    class ApplicationModule {
        @Provides
        static ConfigMapper provideConfigMapper() {
            return new ConfigMapper();
        }

        @Provides
        @Singleton
        static Configuration provideConfiguration(ConfigMapper configMapper) {
            try {
                return configMapper.read(Configuration.class);
            } catch (MappingException exception) {
                throw new RuntimeException(exception);
            }
        }
    }
}

