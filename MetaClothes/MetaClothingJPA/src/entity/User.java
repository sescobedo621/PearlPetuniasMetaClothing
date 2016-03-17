package entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "user")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String name;
	
	private String email;
	
	private String password;
	
	@OneToMany(mappedBy = "user")
	private List<Address> addresses;
	
	@Column(name = "isemployee")
	private boolean isEmployee;
	
	private List<Cart> carts;
	
	private List<Sale> sales;
	
	public User() {
		
	}

	public User(String name, String email, String password, boolean isEmployee)
	{
		super();
		this.name = name;
		this.email = email;
		this.password = password;
		this.isEmployee = isEmployee;
	}

	public int getId()
	{
		return id;
	}

	public String getName()
	{
		return name;
	}

	public void setName(String name)
	{
		this.name = name;
	}

	public String getEmail()
	{
		return email;
	}

	public void setEmail(String email)
	{
		this.email = email;
	}

	public String getPassword()
	{
		return password;
	}

	public void setPassword(String password)
	{
		this.password = password;
	}

	public boolean isEmployee()
	{
		return isEmployee;
	}

	public void setEmployee(boolean isEmployee)
	{
		this.isEmployee = isEmployee;
	}

	public List<Address> getAddresses()
	{
		return addresses;
	}

	public void setAddresses(List<Address> addresses)
	{
		this.addresses = addresses;
	}

	public List<Cart> getCarts()
	{
		return carts;
	}

	public void setCarts(List<Cart> carts)
	{
		this.carts = carts;
	}

	public List<Sale> getSales()
	{
		return sales;
	}

	public void setSales(List<Sale> sales)
	{
		this.sales = sales;
	}

}
