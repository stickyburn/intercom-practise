/*
QUESTION: Factorial of a number

CLARIFICATION QUESTIONS TO ASK:
1. What should be returned for negative numbers? (Error, undefined, or special handling?)
2. What should be returned for 0? (Mathematically 0! = 1)
3. What's the maximum input size I should handle? (Integer overflow concerns)
4. Should I handle decimal/fractional numbers? (Gamma function)
5. What data type should I return? (Number, BigInt, or string for large values)
6. Should I handle input validation or assume valid positive integers?

FOLLOW-UP QUESTIONS & BEST ANSWERS:
1. Q: How would you handle very large numbers that cause overflow?
   A: Use BigInt for arbitrarily large integers, or return as string for extremely large values.

2. Q: Can you implement this without recursion to avoid stack overflow?
   A: Yes, use an iterative approach with a loop, which is more memory efficient.

3. Q: What's the time and space complexity of your solutions?
   A: Recursive: O(n) time, O(n) space (call stack). Iterative: O(n) time, O(1) space.

4. Q: Can you optimize this further using memoization or dynamic programming?
   A: For single factorial calls, memoization doesn't help. But for multiple factorial calculations, we can cache results.

5. Q: How would you handle fractional factorials?
   A: Use the Gamma function: Γ(n+1) = n! for positive integers, extends to real numbers.
*/

// SOLUTION 1: Recursive Approach (Simple and intuitive)
function factorialRecursive(n) {
    // Input validation
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers");
    }
    if (n === 0 || n === 1) {
        return 1;
    }
    
    return n * factorialRecursive(n - 1);
}

// SOLUTION 2: Iterative Approach (More memory efficient)
function factorialIterative(n) {
    // Input validation
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers");
    }
    if (n === 0 || n === 1) {
        return 1;
    }
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    
    return result;
}

// SOLUTION 3: BigInt Approach (Handles very large numbers)
function factorialBigInt(n) {
    // Input validation
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers");
    }
    if (n === 0 || n === 1) {
        return 1n;
    }
    
    let result = 1n;
    for (let i = 2; i <= n; i++) {
        result *= BigInt(i);
    }
    
    return result;
}

// SOLUTION 4: Memoized Approach (Optimal for multiple factorial calculations)
function factorialMemoized() {
    const cache = new Map();
    
    function factorial(n) {
        // Input validation
        if (n < 0) {
            throw new Error("Factorial is not defined for negative numbers");
        }
        if (n === 0 || n === 1) {
            return 1;
        }
        
        // Check cache first
        if (cache.has(n)) {
            return cache.get(n);
        }
        
        // Calculate and cache result
        const result = n * factorial(n - 1);
        cache.set(n, result);
        return result;
    }
    
    return factorial;
}

// Test cases
function runTests() {
    const testCases = [
        { input: 0, expected: 1, description: "Factorial of 0" },
        { input: 1, expected: 1, description: "Factorial of 1" },
        { input: 5, expected: 120, description: "Factorial of 5" },
        { input: 10, expected: 3628800, description: "Factorial of 10" },
        { input: 3, expected: 6, description: "Factorial of 3" }
    ];
    
    console.log("=== Testing Solution 1: Recursive Approach ===");
    testCases.forEach((test, index) => {
        try {
            const result = factorialRecursive(test.input);
            const status = result === test.expected ? "✅ PASS" : "❌ FAIL";
            console.log(`Test ${index + 1} (${test.description}): ${status}`);
            console.log(`  Input: ${test.input}, Expected: ${test.expected}, Got: ${result}`);
        } catch (error) {
            console.log(`Test ${index + 1} (${test.description}): ❌ ERROR - ${error.message}`);
        }
        console.log();
    });
    
    console.log("=== Testing Solution 2: Iterative Approach ===");
    testCases.forEach((test, index) => {
        try {
            const result = factorialIterative(test.input);
            const status = result === test.expected ? "✅ PASS" : "❌ FAIL";
            console.log(`Test ${index + 1} (${test.description}): ${status}`);
            console.log(`  Input: ${test.input}, Expected: ${test.expected}, Got: ${result}`);
        } catch (error) {
            console.log(`Test ${index + 1} (${test.description}): ❌ ERROR - ${error.message}`);
        }
        console.log();
    });
    
    console.log("=== Testing Solution 3: BigInt Approach ===");
    testCases.forEach((test, index) => {
        try {
            const result = factorialBigInt(test.input);
            const expectedBigInt = BigInt(test.expected);
            const status = result === expectedBigInt ? "✅ PASS" : "❌ FAIL";
            console.log(`Test ${index + 1} (${test.description}): ${status}`);
            console.log(`  Input: ${test.input}, Expected: ${test.expected}, Got: ${result}`);
        } catch (error) {
            console.log(`Test ${index + 1} (${test.description}): ❌ ERROR - ${error.message}`);
        }
        console.log();
    });
    
    console.log("=== Testing Solution 4: Memoized Approach ===");
    const memoizedFactorial = factorialMemoized();
    testCases.forEach((test, index) => {
        try {
            const result = memoizedFactorial(test.input);
            const status = result === test.expected ? "✅ PASS" : "❌ FAIL";
            console.log(`Test ${index + 1} (${test.description}): ${status}`);
            console.log(`  Input: ${test.input}, Expected: ${test.expected}, Got: ${result}`);
        } catch (error) {
            console.log(`Test ${index + 1} (${test.description}): ❌ ERROR - ${error.message}`);
        }
        console.log();
    });
    
    // Test large number with BigInt
    console.log("=== Testing Large Number with BigInt ===");
    try {
        const largeResult = factorialBigInt(25);
        console.log(`25! = ${largeResult}`);
        console.log(`Number of digits: ${largeResult.toString().length}`);
    } catch (error) {
        console.log(`Large number test failed: ${error.message}`);
    }
    
    // Test negative number error handling
    console.log("=== Testing Error Handling ===");
    try {
        factorialRecursive(-1);
        console.log("❌ Negative number test failed - should have thrown error");
    } catch (error) {
        console.log("✅ Negative number test passed - correctly threw error");
    }
}

// Run the tests
console.log("Question 2: Factorial of a number");
console.log("===================================");
runTests();

// Example usage
console.log("Example usage:");
console.log(`factorialRecursive(5) = ${factorialRecursive(5)}`);
console.log(`factorialIterative(5) = ${factorialIterative(5)}`);
console.log(`factorialBigInt(20) = ${factorialBigInt(20)}`);
const memoizedFact = factorialMemoized();
console.log(`memoizedFact(5) = ${memoizedFact(5)}`);