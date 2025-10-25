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