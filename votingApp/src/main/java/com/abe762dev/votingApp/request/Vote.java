package com.abe762dev.votingApp.request;


import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Vote {
    private Long pollId;
    private int optionIndex;
}
