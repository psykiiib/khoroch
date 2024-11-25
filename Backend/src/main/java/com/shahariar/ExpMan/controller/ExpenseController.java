package com.shahariar.ExpMan.controller;

import com.shahariar.ExpMan.dto.requestDto.ExpenseRequestDto;
import com.shahariar.ExpMan.dto.responseDto.ExpenseResponseDto;
import com.shahariar.ExpMan.service.ExpenseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/expense-manager")
public class ExpenseController {
    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }
    @PostMapping("/create")
    public ResponseEntity<Object> createExpense(@RequestBody ExpenseRequestDto expenseRequestDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(expenseService.createExpense(expenseRequestDto));
    }
    @GetMapping("/get-all-expense")
    public ResponseEntity<Object> getAllExpense(){
        return ResponseEntity.status(HttpStatus.OK).body(expenseService.getAllExpense());
    }
}
