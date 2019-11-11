package fi.morabotti.travelapp.resources;

import fi.morabotti.travelapp.models.db.TravelMapping;
import fi.morabotti.travelapp.repo.TravelDao;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/travel")
@Produces(MediaType.APPLICATION_JSON)
public class TravelResource {
    private final TravelDao travelDao;

    @Inject
    public TravelResource (TravelDao travelDao) {
        this.travelDao = travelDao;
    }

    @GET
    public List<TravelMapping> fetchTravels() {
        return travelDao.fetchAll();
    }

}
