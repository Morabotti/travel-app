package fi.morabotti.travelapp.resources;

import fi.morabotti.travelapp.models.api.OrderView;
import fi.morabotti.travelapp.models.db.OrderMapping;
import fi.morabotti.travelapp.repo.OrderDao;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.sql.Timestamp;
import java.util.List;

@Path("/order")
@Produces(MediaType.APPLICATION_JSON)
public class OrderResource {
    private final OrderDao orderDao;

    @Inject
    public OrderResource (OrderDao orderDao) {
        this.orderDao = orderDao;
    }

    @GET
    public List<OrderView> fetchOrders() {
        return orderDao.fetchAllToView();
    }

    @GET
    @Path("/{orderId}")
    public OrderView fetchOrder(
            @PathParam("orderId") long id
    ) {
        return orderDao.fetchByIdToView(id)
                .orElseThrow(NotFoundException::new);
    }

    @POST
    public OrderMapping createOrder(
            OrderView orderView
    ) {
        return orderDao.create(this.viewToMapping(orderView))
                .orElseThrow(BadRequestException::new);
    }

    @PUT
    public OrderView editOrder(
            OrderView orderView
    ) {
        return orderDao.edit(this.viewToMapping(orderView))
                .orElseThrow(BadRequestException::new);
    }

    @DELETE
    @Path("/{orderId}")
    public Response deleteOrder(
            @PathParam("orderId") long id
    ) {
        if (!orderDao.delete(id)) {
            throw new InternalServerErrorException("Could not delete order");
        }

        return Response.ok().build();
    }

    private OrderMapping viewToMapping (OrderView orderView) {
        return OrderMapping.builder()
                .setId(orderView.id() == null ? 0L : orderView.id())
                .setStartDate(Timestamp.valueOf(orderView.startDate()))
                .setEndDate(Timestamp.valueOf(orderView.endDate()))
                .setActive(orderView.active())
                .setCustomerId(orderView.customer().id())
                .setTravelId(orderView.travel().id())
                .setExtraInfo(orderView.extraInfo())
                .build();
    }
}
