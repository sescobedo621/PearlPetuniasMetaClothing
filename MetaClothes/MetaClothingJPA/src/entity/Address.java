package entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name ="address")
public class Address {
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private int id;
	@Column(name= "streetaddress")
	private String streetAddress;
	private String city;
	@Column(name=" stateabbrev")
	private String stateAbbrev;
	@Column(name="zip")
	private int zipcode;
	@ManyToOne
	@JoinColumn(name="userid")
	private User user;
	@Column(name="isbilling")
	private boolean isBilling;
	//constructors
	public Address(){
		
	}
	
	public Address(int id, String street, String city, String state, int zip, User user, boolean billing){
		this.id = id;
		this.streetAddress = street;
		this.city = city;
		this.stateAbbrev = state;
		this.zipcode = zip;
		this.user = user;
		this.isBilling = billing;
	}
	//getters and setters
	public int getId()
	{
		return id;
	}
	public void setId(int id)
	{
		this.id = id;
	}
	public String getStreetAddress()
	{
		return streetAddress;
	}
	public void setStreetAddress(String streetAddress)
	{
		this.streetAddress = streetAddress;
	}
	public String getCity()
	{
		return city;
	}
	public void setCity(String city)
	{
		this.city = city;
	}
	public String getStateAbbrev()
	{
		return stateAbbrev;
	}
	public void setStateAbbrev(String stateAbbrev)
	{
		this.stateAbbrev = stateAbbrev;
	}
	public int getZipcode()
	{
		return zipcode;
	}
	public void setZipcode(int zipcode)
	{
		this.zipcode = zipcode;
	}
	public User getUser()
	{
		return user;
	}
	public void setUser(User user)
	{
		this.user = user;
	}
	public boolean isBilling()
	{
		return isBilling;
	}
	public void setBilling(boolean isBilling)
	{
		this.isBilling = isBilling;
	}
	
}
