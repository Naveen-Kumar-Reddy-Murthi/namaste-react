import sum from "../Sum";

it("Test Sum Function",() => {
    const result = sum(3,4);
    expect(result).toBe(7);
});