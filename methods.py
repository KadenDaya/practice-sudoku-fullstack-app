form FastAPI import FastAPI

app = FastAPI()

sudoku_board = [
    [(0, False), (0, False), (0, False), (0, False), (0, False), (0, False), (0, False), (0, False), (0, False)],
    [(0, False), (0, False), (0, False), (0, False), (0, False), (0, False), (0, False), (0, False), (0, False)],
    [(0, False), (0, False), (0, False), (0, False), (0, False), (0, False), (0, False), (0, False), (0, False)],
    [(0, False), (0, False), (0, False), (0, False), (0, False), (0, False), (0, False), (0, False), (0, False)],
    [(0, False), (0, False), (0, False), (0, False), (0, False), (0, False), (0, False), (0, False), (0, False)],
    [(0, False), (0, False), (0, False), (0, False), (0, False), (0, False), (0, False), (0, False), (0, False)],
    [(0, False), (0, False), (0, False), (0, False), (0, False), (0, False), (0, False), (0, False), (0, False)],
    [(0, False), (0, False), (0, False), (0, False), (0, False), (0, False), (0, False), (0, False), (0, False)],
    [(0, False), (0, False), (0, False), (0, False), (0, False), (0, False), (0, False), (0, False), (0, False)],
]
@app.get("/current-board")
def get_sudoku_board():

    return {"board": sudoku_board}

@app.put("/update-board")
def update_sudoku_board(x, y, value):
    if sudoku_board[x][y][1] == True:
        return {"error": "Cell is a starter cell!}
    else:
        sudoku_board[x][y] = (value, False)
        return {"message": "Cell updated successfully!"}
@app.post("/items/")
@app.get("/check-board")
def check_sudoku_board():
    countOfValue = 0
    oneToNine = 0
    for row in sudoku_board:
        oneToNine = 1
        for cell in row:
            if cell[] = oneToNine:
                countOfValue += 1
                break
            else: oneToNine += 1
    if countOfValue == 81:
        return {"message": "Board is full!"}
    else:
        return {"message": "Board is not full!"}