package com.abe762dev.votingApp.controller;

import com.abe762dev.votingApp.request.Vote;
import com.abe762dev.votingApp.model.Poll;
import com.abe762dev.votingApp.services.PollService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/polls")
@CrossOrigin(origins = "http://localhost:4200")
public class PollController {
    private final PollService pollService;

    public PollController(PollService pollService) {
        this.pollService = pollService;
    }

    @PostMapping
    public ResponseEntity<Poll> createPoll(@RequestBody Poll poll) {

        try {
            if (poll.getId() != null) {
                poll.setId(null);
            }
        } catch (Exception ignored) {
            // If Poll uses primitive id (long), this will be a no-op; client-side fix should be applied
        }

        Poll created = pollService.createPoll(poll);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping
    public List<Poll> getAllPolls() {
        return pollService.getAllPolls();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Poll> getPoll(@PathVariable Long id) {
        return pollService.getPollById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/vote")
    public void vote(@RequestBody Vote vote) {
        pollService.vote(vote.getPollId(), vote.getOptionIndex());
    }
}
