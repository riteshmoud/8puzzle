class Board{
    constructor(){
        this.board = []
        this.initialBoard = []
    }

    getBoard() {
        return this.board
    }

    initializeBoard() {
        const list = [1,2,3,4,5,6,7,8,-1]
        for(let i=0;i<3;i++){
            const row = []
            for(let j=0;j<3;j++){
                const randIndex = Math.floor(Math.random()*list.length)
                row.push(list[randIndex])
                list.splice(randIndex,1)
            }
            this.board.push(row)
        }
        this.initialBoard = this.returnSolvableBoard().map((row)=>row.map((num)=>num))
        // this.board = [
        //     [1,2,3],
        //     [4,5,6],
        //     [7,8,-1]
        // ]
        return this.board
        
    }

    makeInversionsEven(){
        const flattenedArray = this.board.flatMap((row) => row);
        let i,j,flag = 0
        for(i=0;i<8;i++){
            if(flattenedArray[i] === -1) continue
            for(j=i+1;j<9;j++){
                if(flattenedArray[j] === -1) continue
                if(flattenedArray[j] < flattenedArray[i]){
                    flag = 1
                    break
                }
            }
            if(flag === 1) break
        }
        const r1 = Math.floor(i/3), c1 = i%3
        const r2 = Math.floor(j/3), c2 = j%3 
        console.log(r1,c1,r2,c2);
        const temp = this.board[r1][c1]
        this.board[r1][c1] = this.board[r2][c2]
        this.board[r2][c2] = temp
    }

    returnSolvableBoard(){
        const numsAppeared = new Set()
        let inversions = 0
        for(let row of this.board){
            for(let num of row){
                for(let i=1;i<=num-1;i++){
                    if(!(numsAppeared.has(i))){
                        inversions++
                    }
                }
                numsAppeared.add(num)
            }
        }
        console.log(inversions);
        if(inversions%2 !== 0){
            this.makeInversionsEven()
        }
        return this.board
    }

    resetBoard(){
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                this.board[i][j] = this.initialBoard[i][j]
            }
        }
    }

    moveTile(e) {
        const row = parseInt(e.target.id.slice(1,2))
        const col = parseInt(e.target.id.slice(3,4))
        if(this.board[row][col] === -1){
            return this.board
        }
        let r2=row
        let c2=col
        // down
        if(row+1 < 3 && this.board[row+1][col] === -1){
            r2++
        }
        // up
        if(row-1 >= 0 && this.board[row-1][col] === -1){
            r2--
        }
        // left
        if(col-1 >= 0 && this.board[row][col-1] === -1){
            c2--
        }
        // right
        if(col+1 < 3 && this.board[row][col+1] === -1){
            c2++
        }
        return this.swap(row,col,r2,c2)
    }

    won() {
        let num = 1
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                if (num === 9) return true
                if(this.board[i][j] !== num) return false
                num++
            }
        }
    }

    swap(r1,c1,r2,c2) {
        const temp = this.board[r1][c1]
        this.board[r1][c1] = -1
        this.board[r2][c2] = temp
        return this.board
    }
}

export default Board