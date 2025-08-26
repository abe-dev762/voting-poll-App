package com.abe762dev.votingApp.model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class OptionVote {
    private String voteOption;
    private Long voteCount = 0L;
}
