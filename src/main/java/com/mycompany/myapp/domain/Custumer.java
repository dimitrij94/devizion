package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Custumer.
 */
@Entity
@Table(name = "custumer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Custumer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "custumer_name", nullable = false)
    private String custumerName;

    @NotNull
    @Column(name = "custumer_surname", nullable = false)
    private String custumerSurname;

    @Column(name = "custumer_contact_number")
    private String custumerContactNumber;

    @Column(name = "custumer_image_uri")
    private String custumerImageUri;

    @OneToMany(mappedBy = "custumer")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<UserOrder> custumerOrders = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustumerName() {
        return custumerName;
    }

    public Custumer custumerName(String custumerName) {
        this.custumerName = custumerName;
        return this;
    }

    public void setCustumerName(String custumerName) {
        this.custumerName = custumerName;
    }

    public String getCustumerSurname() {
        return custumerSurname;
    }

    public Custumer custumerSurname(String custumerSurname) {
        this.custumerSurname = custumerSurname;
        return this;
    }

    public void setCustumerSurname(String custumerSurname) {
        this.custumerSurname = custumerSurname;
    }

    public String getCustumerContactNumber() {
        return custumerContactNumber;
    }

    public Custumer custumerContactNumber(String custumerContactNumber) {
        this.custumerContactNumber = custumerContactNumber;
        return this;
    }

    public void setCustumerContactNumber(String custumerContactNumber) {
        this.custumerContactNumber = custumerContactNumber;
    }

    public String getCustumerImageUri() {
        return custumerImageUri;
    }

    public Custumer custumerImageUri(String custumerImageUri) {
        this.custumerImageUri = custumerImageUri;
        return this;
    }

    public void setCustumerImageUri(String custumerImageUri) {
        this.custumerImageUri = custumerImageUri;
    }

    public Set<UserOrder> getCustumerOrders() {
        return custumerOrders;
    }

    public Custumer custumerOrders(Set<UserOrder> userOrders) {
        this.custumerOrders = userOrders;
        return this;
    }

    public Custumer addCustumerOrders(UserOrder userOrder) {
        this.custumerOrders.add(userOrder);
        userOrder.setCustumer(this);
        return this;
    }

    public Custumer removeCustumerOrders(UserOrder userOrder) {
        this.custumerOrders.remove(userOrder);
        userOrder.setCustumer(null);
        return this;
    }

    public void setCustumerOrders(Set<UserOrder> userOrders) {
        this.custumerOrders = userOrders;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Custumer custumer = (Custumer) o;
        if (custumer.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, custumer.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Custumer{" +
            "id=" + id +
            ", custumerName='" + custumerName + "'" +
            ", custumerSurname='" + custumerSurname + "'" +
            ", custumerContactNumber='" + custumerContactNumber + "'" +
            ", custumerImageUri='" + custumerImageUri + "'" +
            '}';
    }
}
