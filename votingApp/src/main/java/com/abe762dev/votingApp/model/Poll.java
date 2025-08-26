package com.abe762dev.votingApp.model;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Poll {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String question;

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "poll_options", joinColumns = @JoinColumn(name = "poll_id"))
    private List<OptionVote> options = new ArrayList<>();

//    @ElementCollection
//    private List<String> votes = new ArrayList<>();
}
