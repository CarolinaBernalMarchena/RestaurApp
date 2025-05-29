package com.training.server.entities;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.training.server.enums.Status;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    String uuid;
    @ManyToOne
    RestaurantTable table;
    LocalDateTime startDateTime;
    LocalDateTime closeDateTime;
    Status status;
    @OneToMany(cascade = CascadeType.ALL)
    List<OrderItem> basket;

    public Session() {
        this.uuid = UUID.randomUUID().toString();
        this.startDateTime = LocalDateTime.now();
        this.status = Status.OPEN;
        this.basket = List.of();
    }

    public Long getId() {
        return id;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public LocalDateTime getStartDateTime() {
        return startDateTime;
    }

    public void setStartDateTime(LocalDateTime startDateTime) {
        this.startDateTime = startDateTime;
    }

    public LocalDateTime getCloseDateTime() {
        return closeDateTime;
    }

    public void setCloseDateTime(LocalDateTime closeDateTime) {
        this.closeDateTime = closeDateTime;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public RestaurantTable getTable() {
        return table;
    }

    public void setTable(RestaurantTable table) {
        this.table = table;
    }

    public List<OrderItem> getBasket() {
        return basket;
    }

    public void setBasket(List<OrderItem> basket) {
        this.basket = basket;
    }

    public void addToBasket(Dish product) {
        Optional<OrderItem> orderOptional = this.basket.stream().filter(orderItem -> orderItem.getProduct() == product).findFirst();
        if(orderOptional.isPresent()) {
            OrderItem updatedOrder = orderOptional.get();
            updatedOrder.setQuantity(updatedOrder.getQuantity() + 1);
            this.basket.set(this.basket.indexOf(orderOptional.get()), updatedOrder);
        }
        else {
            this.basket.add(new OrderItem(product, 1));
        }
    }

    public void removeFromBasket(Optional<OrderItem> orderOptional) {
        OrderItem updatedOrder = orderOptional.get();
        if(updatedOrder.getQuantity() == 1) {
            this.basket.remove(this.basket.indexOf(updatedOrder));
        }
        else {
            updatedOrder.setQuantity(updatedOrder.getQuantity() - 1);
            this.basket.set(this.basket.indexOf(orderOptional.get()), updatedOrder);
        }
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((uuid == null) ? 0 : uuid.hashCode());
        result = prime * result + ((table == null) ? 0 : table.hashCode());
        result = prime * result + ((startDateTime == null) ? 0 : startDateTime.hashCode());
        result = prime * result + ((closeDateTime == null) ? 0 : closeDateTime.hashCode());
        result = prime * result + ((status == null) ? 0 : status.hashCode());
        result = prime * result + ((basket == null) ? 0 : basket.hashCode());
        return result;
    }
    
    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Session other = (Session) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (uuid == null) {
            if (other.uuid != null)
                return false;
        } else if (!uuid.equals(other.uuid))
            return false;
        if (table == null) {
            if (other.table != null)
                return false;
        } else if (!table.equals(other.table))
            return false;
        if (startDateTime == null) {
            if (other.startDateTime != null)
                return false;
        } else if (!startDateTime.equals(other.startDateTime))
            return false;
        if (closeDateTime == null) {
            if (other.closeDateTime != null)
                return false;
        } else if (!closeDateTime.equals(other.closeDateTime))
            return false;
        if (status != other.status)
            return false;
        if (basket == null) {
            if (other.basket != null)
                return false;
        } else if (!closeDateTime.equals(other.closeDateTime))
            return false;
        if (status != other.status)
            return false;
        if (basket == null) {
            if (other.basket != null)
                return false;
        } else if (!basket.equals(other.basket))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Session [id=" + id + ", uuid=" + uuid + ", table=" + table + ", startDateTime=" + startDateTime
                + ", closeDateTime=" + closeDateTime + ", status=" + status + ", basket=" + basket + "]";
    }
    
}
