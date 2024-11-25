package com.shahariar.ExpMan.dto.requestDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ExpenseRequestDto {
    private String expenseCategory;
    private String expenseName;
    private LocalDate date;
    private String description;
    private Double amount;
}
