using System;

namespace MinecraftMapper.MapGeneration
{
    public class Square
    {
        public Square(int x, int y)
        {
            this.x = x;
            this.y = y;
        }
	
        public static Square CreateFromNumber(int number)
        {
            var ring = Ring.GetRingForNumber(number);
		
            // ring length 0 = 0/1
            // ring length 1 = 8
            // ring length 2 = 16
            // ring length 3 = 24
            return new Square(0,0);
        }

        private int x;
        private int y;
	
        public Ring Ring => new Ring(Math.Max(Math.Abs(x), Math.Abs(y)));
	
        public void MoveUp() {
            y++;
        }
	
        public void MoveLeft() {
            x--;
        }
	
        public void MoveRight() {
            x++;
        }
	
        public void MoveDown() {
            y--;
        }
	
        public int Number 
        {
            get 
            {
                if (Ring.Number == 0)
                    return 1;

                if (Math.Abs(y) == Ring.Number) {
                    return (y >= 0 ? Ring.PositiveYValue + x : Ring.NegativeYValue -x);
                }
			 
                // If y doesn't equal ring number, X must, or it'd be a different ring.
                return (x >= 0 ? Ring.PositiveXValue - y : Ring.NegativeXValue + y);
            }
        }
    }
}