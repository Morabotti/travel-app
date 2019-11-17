package fi.morabotti.travelapp.resources;

import fi.morabotti.travelapp.models.api.OrderView;
import fi.morabotti.travelapp.models.api.TravelView;
import fi.morabotti.travelapp.models.db.TravelMapping;
import fi.morabotti.travelapp.repo.OrderDao;
import fi.morabotti.travelapp.repo.TravelDao;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.stream.Collectors;

@Path("/travel")
@Produces(MediaType.APPLICATION_JSON)
public class TravelResource {
    private final TravelDao travelDao;
    private final OrderDao orderDao;

    @Inject
    public TravelResource (TravelDao travelDao, OrderDao orderDao) {
        this.travelDao = travelDao;
        this.orderDao = orderDao;
    }

    @GET
    public List<TravelView> fetchTravels() {
        return travelDao.fetchAll()
                .stream()
                .map(this::mappingToView)
                .collect(Collectors.toList());
    }

    @GET
    @Path("/{travelId}")
    public TravelView fetchTravel(
            @PathParam("travelId") long id
    ) {
        return travelDao.fetchById(id)
                .map(this::mappingToView)
                .orElseThrow(NotFoundException::new);
    }

    @GET
    @Path("/orders/{travelId}")
    public List<OrderView> fetchCustomerOrders(
            @PathParam("travelId") long id
    ) {
        return orderDao.fetchTravelsOrders(id);
    }

    @POST
    public TravelView createTravel(
            TravelView travelView
    ) {
        return travelDao.create(this.viewToMapping(travelView))
                .map(this::mappingToView)
                .orElseThrow(BadRequestException::new);
    }

    @PUT
    public TravelView editTravel(
            TravelView travelView
    ) {
        return travelDao.edit(this.viewToMapping(travelView))
                .map(this::mappingToView)
                .orElseThrow(BadRequestException::new);
    }

    @DELETE
    @Path("/{travelId}")
    public Response deleteTravel(
            @PathParam("travelId") long id
    ) {
        if (!travelDao.delete(id)) {
            throw new InternalServerErrorException("Could not delete travel");
        }

        return Response.ok().build();
    }

    private TravelMapping viewToMapping (TravelView travelView) {
        return TravelMapping.builder()
                .setId(travelView.id() == null ? 0L : travelView.id())
                .setTravelCode(travelView.travelCode())
                .setName(travelView.name())
                .setDescription(travelView.description())
                .setStartingCity(travelView.startingCity())
                .setDestinationCity(travelView.destinationCity())
                .setGuidedTour(travelView.guidedTour())
                .setCost(travelView.cost())
                .setGuide(travelView.guide())
                .setTravelType(travelView.travelType())
                .build();
    }

    private TravelView mappingToView (TravelMapping travelMapping) {
        return TravelView.builder()
                .setId(travelMapping.id())
                .setTravelCode(travelMapping.travelCode())
                .setName(travelMapping.name())
                .setDescription(travelMapping.description())
                .setStartingCity(travelMapping.startingCity())
                .setDestinationCity(travelMapping.destinationCity())
                .setGuidedTour(travelMapping.guidedTour())
                .setCost(travelMapping.cost())
                .setGuide(travelMapping.guide())
                .setTravelType(travelMapping.travelType())
                .build();
    }
}
