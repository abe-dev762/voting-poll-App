package com.abe762dev.votingApp.repositories;


import com.abe762dev.votingApp.model.Poll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PollRepository extends JpaRepository<Poll, Long> {

}
