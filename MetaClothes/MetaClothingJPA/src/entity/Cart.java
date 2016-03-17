package entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "cart")
public class Cart
{	
	@Column(name = "orderid")
	private String orderId;
	
	@Column(name = "userid")
	private int userId;
	
	@Column(name = "itemid")
	private int itemId;
	private int quantity;
	
	private List<Item> items;
	
	private List<User> users;
	
	public Cart() {
		
	}
	
	public Cart(String orderId, int userId, int itemId, int quantity)
	{
		super();
		this.orderId = orderId;
		this.userId = userId;
		this.itemId = itemId;
		this.quantity = quantity;
	}

	public String getOrderId()
	{
		return orderId;
	}

	public void setOrderId(String orderId)
	{
		this.orderId = orderId;
	}

	public int getUserId()
	{
		return userId;
	}

	public void setUserId(int userId)
	{
		this.userId = userId;
	}

	public int getItemId()
	{
		return itemId;
	}

	public void setItemId(int itemId)
	{
		this.itemId = itemId;
	}

	public int getQuantity()
	{
		return quantity;
	}

	public void setQuantity(int quantity)
	{
		this.quantity = quantity;
	}

	public List<User> getUsers()
	{
		return users;
	}

	public void setUsers(List<User> users)
	{
		this.users = users;
	}

	public List<Item> getItems()
	{
		return items;
	}

	public void setItems(List<Item> items)
	{
		this.items = items;
	}
	
}
