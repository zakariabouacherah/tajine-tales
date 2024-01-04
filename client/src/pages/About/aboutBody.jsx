export const AboutBody = () => {
  const aboutList = [
    {
      title: "Our Mission",
      text: "At TajineTales, our mission is to transport you to the bustling markets, aromatic kitchens, and vibrant feasts of Morocco. Through our curated collection of authentic recipes, culinary insights, and captivating stories, we invite you to embark on a culinary adventure like no other.",
      imgUrl:
        "https://images.pexels.com/photos/4049960/pexels-photo-4049960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "Journey So Far",
      text: "Founded in 2023, TajineTales has been on a flavorful journey, curating a treasure trove of Moroccan culinary delights. From the iconic tagines to the intricate pastries, each recipe is a celebration of Morocco's diverse and rich gastronomic tapestry.",
      imgUrl:
        "https://images.pexels.com/photos/18886241/pexels-photo-18886241/free-photo-of-clairiere-ete-agriculture-fleur.jpeg",
    },
    {
      title: "Meet the Team",
      text: "Behind the scenes, our dedicated team shares a deep love for Moroccan culture and cuisine. From seasoned chefs to passionate writers and enthusiastic home cooks, we are united by the belief that food has the power to transcend borders and create connections.",
      imgUrl:
        "https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg",
    },
    {
      title: "Our Philosophy",
      text: "At the heart of [Your Website Name] is a commitment to celebrating the art of cooking, preserving culinary traditions, and fostering a sense of connection through food. Every recipe is a journey, an exploration of Morocco's unique spices, flavors, and culinary techniques.",
      imgUrl:
        "https://images.pexels.com/photos/2802527/pexels-photo-2802527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];
  return (
    <section className="about-body">
      <ul className="about-list">
        {aboutList.map((item, index) => (
          <li className="about-item" key={index}>
            <div className="det">
              <h1>{item.title} : </h1>
              <p>{item.text} </p>
            </div>
            <div className="img">
                <img src={item.imgUrl} alt={item.title} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
