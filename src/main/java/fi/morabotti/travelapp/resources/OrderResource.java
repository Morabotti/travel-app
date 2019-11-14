package fi.morabotti.travelapp.resources;

import fi.morabotti.travelapp.models.db.OrderMapping;
import fi.morabotti.travelapp.repo.OrderDao;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
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
    public List<OrderMapping> fetchOrders() {
        return orderDao.fetchAll();
    }

}
