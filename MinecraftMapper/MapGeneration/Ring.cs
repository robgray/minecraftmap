namespace MinecraftMapper.MapGeneration
{
	/// <summary>
	/// Rings are "layers" of maps outward from the center.
	/// The first map is ring 0.
	/// the second ring of maps are one out from the first in any direction, and are the next 8 maps.
	/// ... and so on.
	/// </summary>
    public class Ring
    {
        public Ring(int ringNumber)
	{
		Number = ringNumber;
	}
	
	public int Number;
	
	public int Size => GetSize(Number);
	public int StartNumber => Ring.GetStartNumber(this.Number);
	public int EndNumber => Ring.GetEndNumber(this.Number);
	public int ThreeQuarterNumber => EndNumber - (Size / 4);
	public int HalfNumber => EndNumber - (Size / 2);
	public int QuarterNumber => EndNumber - (Size * 3 / 4);
	
	public static int GetSize(int ring) 
	{
		if (ring == 0)
			return 1;
			
		if (ring == 1)
			return 8;
			
		return GetSize(ring - 1) + 8; 
	}
	
	public (int X, int Y) StartCoordinates => (-(Number - 1), Number);
	
	public (int X, int Y) GetCoordinatesForNumber(int number)
	{
		// Numbering is always clockwise, so we can do an inefficient check here
		// If we're going more X we can check the current to see if it's the same 
		// ring.  If not we need to start subtracting Y
		// If going down makes it a new ring, then we need to start substracting X
		// finally adding Y.
		
		var coords = StartCoordinates; 	// Always anti-clockwise from PositiveY but on same Y axis.
		if (number == this.StartNumber)
		{
			return coords;
		}
		
		if (number <= PositiveYValue)
		{
			return (0 - (PositiveYValue - number), Number);
		}
		
		if (number <= PositiveXValue)
		{
			if (number <= QuarterNumber)
			{
				return (Number - (QuarterNumber - number), Number);
			} else {
				return (Number, Number - (number - QuarterNumber));
			}
		}
		
		if (number <= NegativeYValue)
		{
			if (number <= HalfNumber)
			{
				return (Number, -Number - (number - HalfNumber));
			} 
			else 
			{
				return ((NegativeYValue - number), -Number);
			}
		} 
		
		if (number <= NegativeXValue)
		{
			if (number <= ThreeQuarterNumber)
			{
				return (-Number - (number - ThreeQuarterNumber), -Number);
			} 
			else 
			{
				return (-Number, -Number - (ThreeQuarterNumber - number));
			}
		} 
		else 
		{
			return (-Number, Number - (EndNumber - number));
		}
	}
	
	public static int GetStartNumber(int ringNumber)
	{
		if (ringNumber == 0)
			return 1;
			
		if (ringNumber == 1)
			return 2;
			
		return (8 * (ringNumber - 1)) + GetStartNumber(ringNumber - 1);
	}
	
	public static Ring GetRingForNumber(int number)
	{
		var ringNumber = 0;
		while (GetEndNumber(ringNumber) < number)
		{
			ringNumber++;
		}
		
		return new Ring(ringNumber);
	}
	
	public static int GetEndNumber(int ringNumber)
	{
		if (ringNumber == 0)
			return 1;
		
		return GetStartNumber(ringNumber + 1) - 1;
	}
	
	public int PositiveXValue => GetPositiveX(Number);
	public int PositiveYValue => GetPositiveY(Number);
	public int NegativeXValue => GetNegativeX(Number);
	public int NegativeYValue => GetNegativeY(Number);
	
	private int GetNegativeX(int ringNumber)
	{
		if (ringNumber == 0)
			return 1;
				
		return GetNegativeXJump(ringNumber) + GetNegativeX(ringNumber - 1);
	}
	
	private int GetNegativeY(int ringNumber)
	{
		if (ringNumber == 0)
			return 1;
		
		return GetNegativeYJump(ringNumber) + GetNegativeY(ringNumber - 1);
	}
	
	private int GetPositiveY(int ringNumber)
	{
		if (ringNumber == 0)
			return 1;

		return GetPositiveYJump(ringNumber) + GetPositiveY(ringNumber - 1);
	}
	
	private int GetPositiveX(int ringNumber)
	{
		if (ringNumber == 0)
			return 1;
		
		return  GetPositiveXJump(ringNumber) +  GetPositiveX(ringNumber - 1);
	}
	
	private int GetPositiveXJump(int ringNumber)
	{		
		if (ringNumber == 1)
			return 3;
		
		return 8 + GetPositiveXJump(ringNumber - 1);
	}
	
	private int GetPositiveYJump(int ringNumber)
	{	
		if (ringNumber == 1)
			return 1;
		
		return 8 + GetPositiveYJump(ringNumber - 1);
	}
	
	private int GetNegativeXJump(int ringNumber)
	{	
		if (ringNumber == 1)
			return 7;
			
		return 8 + GetNegativeXJump(ringNumber - 1);
	}
	
	private int GetNegativeYJump(int ringNumber)
	{	
		if (ringNumber == 1)
			return 5;
			
		return 8 + GetNegativeYJump(ringNumber - 1);
	}
    }
}