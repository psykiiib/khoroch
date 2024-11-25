package com.shahariar.ExpMan.repository;

import com.shahariar.ExpMan.entity.ExpenseEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpenseRepository extends JpaRepository<ExpenseEntry, String> {
}
