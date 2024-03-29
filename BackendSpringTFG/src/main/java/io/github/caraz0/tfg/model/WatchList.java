package io.github.caraz0.tfg.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "WatchList")
public class WatchList {

    @Id
    private Long id;

    @Column(nullable = false)
    private String symbol;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;
    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
