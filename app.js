document.addEventListener('DOMContentLoaded', () => {
  const gridDisplay = document.querySelector('.grid')
  const scoreDisplay = document.querySelector('#score')
  const resultDisplay = document.querySelector('#result')
  
  const WIDTH = 4

  const squares = []
  let score = 0

  const fillSquare = (square, number) => {
    square.innerHTML = number
    square.dataset.value = number
  }

  const createBoard = () => {
    for (let i = 0; i < WIDTH * WIDTH; i++) {
      const square = document.createElement('div')
      fillSquare(square, 0)
      gridDisplay.appendChild(square);
      squares.push(square)
    }

    generate()
    generate()
  }

  const checkForWin = () => {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML === 2048) {
        resultDisplay.innerHTML = 'You WIN!'
        document.removeEventListener('keydown', control)
      }
    }
  }

  const checkForGameOver = () => {
    const isBoardFull = squares.every(square => square.innerHTML !== '0')

    if (isBoardFull) {
      resultDisplay.innerHTML = 'You LOSE!'
      document.removeEventListener('keydown', control)
    }
  }

  const generate = () => {
    const randomNumber = Math.floor(Math.random() * squares.length)

    if (squares[randomNumber].innerHTML === '0') {
      fillSquare(squares[randomNumber], 2)
      checkForGameOver()
    } else {
      generate()
    }
  }

  const combineRow = () => {
    for (let i = 0; i < 15; i++) {
      if (squares[i].innerHTML === squares[i + 1].innerHTML) {
        const combinedTotal = parseInt(squares[i].innerHTML) * 2
        fillSquare(squares[i], combinedTotal)
        fillSquare(squares[i + 1], 0)
        score += combinedTotal
        scoreDisplay.innerHTML = score
      }
    }
    checkForWin()
  }

  const combineColumn = () => {
    for (let i = 0; i < 12; i++) {
      if (squares[i].innerHTML === squares[i + WIDTH].innerHTML) {
        const combinedTotal = parseInt(squares[i].innerHTML) * 2
        fillSquare(squares[i], combinedTotal)
        fillSquare(squares[i + WIDTH], 0)
        score += combinedTotal
        scoreDisplay.innerHTML = score
      }
    }
    checkForWin()
  }

  const moveRight = () => {
    for(let i = 0; i < WIDTH * WIDTH; i++) {
      if (i % 4 === 0) {
        let totalOne = parseInt(squares[i].innerHTML)
        let totalTwo = parseInt(squares[i + 1].innerHTML)
        let totalThree = parseInt(squares[i + 2].innerHTML)
        let totalFour = parseInt(squares[i + 3].innerHTML)
        let row = [totalOne, totalTwo, totalThree, totalFour]

        let filteredRow = row.filter(value => value)
        let missing = WIDTH - filteredRow.length
        let zeros = Array(missing).fill(0)
        let newRow = zeros.concat(filteredRow)
        fillSquare(squares[i], newRow[0])
        fillSquare(squares[i + 1], newRow[1])
        fillSquare(squares[i + 2], newRow[2])
        fillSquare(squares[i + 3], newRow[3])
      }
    }
  }

  const moveLeft = () => {
    for(let i = 0; i < WIDTH * WIDTH; i++) {
      if (i % 4 === 0) {
        let totalOne = parseInt(squares[i].innerHTML)
        let totalTwo = parseInt(squares[i + 1].innerHTML)
        let totalThree = parseInt(squares[i + 2].innerHTML)
        let totalFour = parseInt(squares[i + 3].innerHTML)
        let row = [totalOne, totalTwo, totalThree, totalFour]

        let filteredRow = row.filter(value => value)
        let missing = WIDTH - filteredRow.length
        let zeros = Array(missing).fill(0)
        let newRow = filteredRow.concat(zeros)
        fillSquare(squares[i], newRow[0])
        fillSquare(squares[i + 1], newRow[1])
        fillSquare(squares[i + 2], newRow[2])
        fillSquare(squares[i + 3], newRow[3])
      }
    }
  }

  const moveUp = () => {
    for(let i = 0; i < WIDTH; i++) {
      let totalOne = parseInt(squares[i].innerHTML)
      let totalTwo = parseInt(squares[i + WIDTH].innerHTML)
      let totalThree = parseInt(squares[i + WIDTH * 2].innerHTML)
      let totalFour = parseInt(squares[i + WIDTH * 3].innerHTML)
      let column = [totalOne, totalTwo, totalThree, totalFour]

      let filteredColumn = column.filter(value => value)
      let missing = WIDTH - filteredColumn.length
      let zeros = Array(missing).fill(0)
      let newColumn = filteredColumn.concat(zeros)
      fillSquare(squares[i], newColumn[0])
      fillSquare(squares[i + WIDTH], newColumn[1])
      fillSquare(squares[i + WIDTH * 2], newColumn[2])
      fillSquare(squares[i + WIDTH * 3], newColumn[3])
    }
  }

  const moveDown = () => {
    for(let i = 0; i < WIDTH; i++) {
      let totalOne = parseInt(squares[i].innerHTML)
      let totalTwo = parseInt(squares[i + WIDTH].innerHTML)
      let totalThree = parseInt(squares[i + WIDTH * 2].innerHTML)
      let totalFour = parseInt(squares[i + WIDTH * 3].innerHTML)
      let column = [totalOne, totalTwo, totalThree, totalFour]

      let filteredColumn = column.filter(value => value)
      let missing = WIDTH - filteredColumn.length
      let zeros = Array(missing).fill(0)
      let newColumn = zeros.concat(filteredColumn)
      fillSquare(squares[i], newColumn[0])
      fillSquare(squares[i + WIDTH], newColumn[1])
      fillSquare(squares[i + WIDTH * 2], newColumn[2])
      fillSquare(squares[i + WIDTH * 3], newColumn[3])
    }
  }

  const control = (e) => {
    if (e.key === 'ArrowRight') {
      moveRight()
      combineRow()
      moveRight()
      generate()
    } else if (e.key === 'ArrowLeft') {
      moveLeft()
      combineRow()
      moveLeft()
      generate()
    } else if (e.key === 'ArrowUp') {
      moveUp()
      combineColumn()
      moveUp()
      generate()
    } else if (e.key === 'ArrowDown') {
      moveDown()
      combineColumn()
      moveDown()
      generate()
    }
  }

  createBoard()

  document.addEventListener('keydown', control)
})
