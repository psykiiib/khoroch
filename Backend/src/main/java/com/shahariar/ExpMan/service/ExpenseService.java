package com.shahariar.ExpMan.service;

import com.shahariar.ExpMan.dto.requestDto.ExpenseRequestDto;
import com.shahariar.ExpMan.entity.ExpenseEntry;
import com.shahariar.ExpMan.repository.ExpenseRepository;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {
//    @Autowired
//    private ExpenseRepository expenseRepository;

    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }
    public String createExpense(ExpenseRequestDto requestDto) {
        if(requestDto != null){
            ExpenseEntry expense = new ExpenseEntry();
            expense.setExpenseCategory(requestDto.getExpenseCategory());
            expense.setExpenseName(requestDto.getExpenseName());
            expense.setDate(requestDto.getDate());
            expense.setDescription(requestDto.getDescription());
            expense.setAmount(requestDto.getAmount());

            expenseRepository.save(expense);
            return "Expense Created!!!";
        }
        else return "Unable to create Expense Entity";
    }
    public List<ExpenseEntry> getAllExpense(){
        return expenseRepository.findAll();
    }
}
