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
@Table(name = "PortfolioEntry")
public class PortfolioEntry {
    @Id
    private Long id;

    @Column(nullable = false)
    private String symbol;

    @Column(nullable = false)
    private int amount;

    @Column(nullable = false)
    private double price;

    @Column(nullable = false)
    private String date;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

}
