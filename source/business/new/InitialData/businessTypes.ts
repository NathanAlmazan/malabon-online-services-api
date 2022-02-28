const businessTypes = [
    {
     "Business": "Nursery\/Elementary School",
     "Zone": "R1-Z"
    },
    {
     "Business": "Tutorial services",
     "Zone": "R1-Z"
    },
    {
     "Business": "Clubhouse and other social centers",
     "Zone": "R1-Z"
    },
    {
     "Business": "Sports club",
     "Zone": "R1-Z"
    },
    {
     "Business": "Clinic",
     "Zone": "R1-Z"
    },
    {
     "Business": "Day-care centers",
     "Zone": "R1-Z"
    },
    {
     "Business": "Apartments",
     "Zone": "BR2-Z"
    },
    {
     "Business": "Boarding houses",
     "Zone": "BR2-Z"
    },
    {
     "Business": "Dormitories",
     "Zone": "BR2-Z"
    },
    {
     "Business": "Museums",
     "Zone": "BR2-Z"
    },
    {
     "Business": "Libraries",
     "Zone": "BR2-Z"
    },
    {
     "Business": "High School",
     "Zone": "BR2-Z"
    },
    {
     "Business": "Vocational School",
     "Zone": "BR2-Z"
    },
    {
     "Business": "Sari-sari store",
     "Zone": "MR2-Z"
    },
    {
     "Business": "Photo and portraits studios",
     "Zone": "MR2-Z"
    },
    {
     "Business": "Flower Shops",
     "Zone": "MR2-Z"
    },
    {
     "Business": "School supplies",
     "Zone": "MR2-Z"
    },
    {
     "Business": "Art supplies",
     "Zone": "MR2-Z"
    },
    {
     "Business": "Curio or antique shops",
     "Zone": "MR2-Z"
    },
    {
     "Business": "Drug stores",
     "Zone": "MR2-Z"
    },
    {
     "Business": "Sporting goods, Dry goods, Haberdasheries and ready and knitted wear stores",
     "Zone": "MR2-Z"
    },
    {
     "Business": "General merchandise",
     "Zone": "MR2-Z"
    },
    {
     "Business": "Souvenir and novelty items",
     "Zone": "MR2-Z"
    },
    {
     "Business": "Wellness products, beauty products, herbal products and the like",
     "Zone": "MR2-Z"
    },
    {
     "Business": "Jewelry Shops",
     "Zone": "MR2-Z"
    },
    {
     "Business": "Pet shop and aquarium stores",
     "Zone": "MR2-Z"
    },
    {
     "Business": "Consumer electronics such as cellular phone, cameras, lap tops, home appliances and the like.",
     "Zone": "MR2-Z"
    },
    {
     "Business": "Glassware, metal wares and kitchen wares",
     "Zone": "MR2-Z"
    },
    {
     "Business": "Shoe shine\/repair shops",
     "Zone": "MR2-Z"
    },
    {
     "Business": "watch repair shops",
     "Zone": "MR2-Z"
    },
    {
     "Business": "Laundries and Laundromats",
     "Zone": "MR2-Z"
    },
    {
     "Business": "Medical, dental and similar clinic",
     "Zone": "MR2-Z"
    },
    {
     "Business": "Tailoring and Dressmaking shops",
     "Zone": "MR2-Z"
    },
    {
     "Business": "Beauty Parlor and Barbershops",
     "Zone": "MR2-Z"
    },
    {
     "Business": "Wellness facilities such as sauna, spa, massage and skin\/facial Clinic",
     "Zone": "MR2-Z"
    },
    {
     "Business": "Gym",
     "Zone": "MR2-Z"
    },
    {
     "Business": "Frozen foods like meat, fish, poultry stores, dairy products and the like.",
     "Zone": "MR2-Z"
    },
    {
     "Business": "Bakeshop and Bakery goods store",
     "Zone": "MR2-Z"
    },
    {
     "Business": "Convenience Stores",
     "Zone": "MR2-Z"
    },
    {
     "Business": "Repair Shops\/Shoe shine",
     "Zone": "MR2-Z"
    },
    {
     "Business": "Repair shops for watches, bags and shoes.",
     "Zone": "MR2-Z"
    },
    {
     "Business": "Repair shops for cellular phones, cameras, computers and the like.",
     "Zone": "MR2-Z"
    },
    {
     "Business": "Bicycle repair shops",
     "Zone": "MR2-Z"
    },
    {
     "Business": "House furniture and appliances repair shops on neighborhood scale",
     "Zone": "MR2-Z"
    },
    {
     "Business": "Event Planners",
     "Zone": "MR2-Z"
    },
    {
     "Business": "Courier Services",
     "Zone": "MR2-Z"
    },
    {
     "Business": "Security Agencies",
     "Zone": "MR2-Z"
    },
    {
     "Business": "Janitorial Services",
     "Zone": "MR2-Z"
    },
    {
     "Business": "Nursery\/Elementary School",
     "Zone": "BR3-Z"
    },
    {
     "Business": "Tutorial services",
     "Zone": "BR3-Z"
    },
    {
     "Business": "Clubhouse and other social centers",
     "Zone": "BR3-Z"
    },
    {
     "Business": "Sports club",
     "Zone": "BR3-Z"
    },
    {
     "Business": "Clinic",
     "Zone": "BR3-Z"
    },
    {
     "Business": "Day-care centers",
     "Zone": "BR3-Z"
    },
    {
     "Business": "Apartments",
     "Zone": "BR3-Z"
    },
    {
     "Business": "Boarding houses",
     "Zone": "BR3-Z"
    },
    {
     "Business": "Dormitories",
     "Zone": "BR3-Z"
    },
    {
     "Business": "Museums",
     "Zone": "BR3-Z"
    },
    {
     "Business": "Libraries",
     "Zone": "BR3-Z"
    },
    {
     "Business": "High School",
     "Zone": "BR3-Z"
    },
    {
     "Business": "Vocational School",
     "Zone": "BR3-Z"
    },
    {
     "Business": "Residential condominiums",
     "Zone": "BR3-Z"
    },
    {
     "Business": "Hotel apartments or apartels",
     "Zone": "BR3-Z"
    },
    {
     "Business": "Hotels",
     "Zone": "BR3-Z"
    },
    {
     "Business": "Nursery\/Elementary School",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Tutorial services",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Clubhouse and other social centers",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Sports club",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Clinic",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Day-care centers",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Apartments",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Boarding houses",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Dormitories",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Museums",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Libraries",
     "Zone": "MR3-Z"
    },
    {
     "Business": "High School",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Vocational School",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Sari-sari store",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Photo and portraits studios",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Flower Shops",
     "Zone": "MR3-Z"
    },
    {
     "Business": "School supplies",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Art supplies",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Curio or antique shops",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Drug stores",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Sporting goods, Dry goods, Haberdasheries and ready and knitted wear stores",
     "Zone": "MR3-Z"
    },
    {
     "Business": "General merchandise",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Souvenir and novelty items",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Wellness products, beauty products, herbal products and the like",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Jewelry Shops",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Pet shop and aquarium stores",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Consumer electronics such as cellular phone, cameras, lap tops, home appliances and the like.",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Glassware, metal wares and kitchen wares",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Shoe shine\/repair shops",
     "Zone": "MR3-Z"
    },
    {
     "Business": "watch repair shops",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Laundries and Laundromats",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Medical, dental and similar clinic",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Tailoring and Dressmaking shops",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Beauty Parlor and Barbershops",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Wellness facilities such as sauna, spa, massage and skin\/facial Clinic",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Gym",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Frozen foods like meat, fish, poultry stores, dairy products and the like.",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Bakeshop and Bakery goods store",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Convenience Stores",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Repair Shops\/Shoe shine",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Repair shops for watches, bags and shoes.",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Repair shops for cellular phones, cameras, computers and the like.",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Bicycle repair shops",
     "Zone": "MR3-Z"
    },
    {
     "Business": "House furniture and appliances repair shops on neighborhood scale",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Event Planners",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Courier Services",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Security Agencies",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Janitorial Services",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Pension House",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Parking Buildings",
     "Zone": "MR3-Z"
    },
    {
     "Business": "Department stores",
     "Zone": "C1-Z"
    },
    {
     "Business": "Bookstores and office supply shops",
     "Zone": "C1-Z"
    },
    {
     "Business": "Art supplies and novelties",
     "Zone": "C1-Z"
    },
    {
     "Business": "Home appliance stores",
     "Zone": "C1-Z"
    },
    {
     "Business": "Car display and dealer stores",
     "Zone": "C1-Z"
    },
    {
     "Business": "Photo shops",
     "Zone": "C1-Z"
    },
    {
     "Business": "Flower shops",
     "Zone": "C1-Z"
    },
    {
     "Business": "Curio or antique shops",
     "Zone": "C1-Z"
    },
    {
     "Business": "Pet shops and aquarium stores",
     "Zone": "C1-Z"
    },
    {
     "Business": "Jewelry shops",
     "Zone": "C1-Z"
    },
    {
     "Business": "Consumer electronics such as cellular phones, cameras, laptops, home appliances and the like",
     "Zone": "C1-Z"
    },
    {
     "Business": "Drugstores",
     "Zone": "C1-Z"
    },
    {
     "Business": "Bakery, cake, pastry and delicatessen shops",
     "Zone": "C1-Z"
    },
    {
     "Business": "Liquor and wine stores",
     "Zone": "C1-Z"
    },
    {
     "Business": "Groceries",
     "Zone": "C1-Z"
    },
    {
     "Business": "Supermarkets",
     "Zone": "C1-Z"
    },
    {
     "Business": "Convenience stores",
     "Zone": "C1-Z"
    },
    {
     "Business": "Medical, dental, and similar clinics",
     "Zone": "C1-Z"
    },
    {
     "Business": "Beauty parlor",
     "Zone": "C1-Z"
    },
    {
     "Business": "Barber shop",
     "Zone": "C1-Z"
    },
    {
     "Business": "Wellness facilities such as sauna, spa, massage and facial clinics",
     "Zone": "C1-Z"
    },
    {
     "Business": "Dressmaking and tailoring shop",
     "Zone": "C1-Z"
    },
    {
     "Business": "Bayad centers",
     "Zone": "C1-Z"
    },
    {
     "Business": "Laundries",
     "Zone": "C1-Z"
    },
    {
     "Business": "Internet cafe and cyber stations",
     "Zone": "C1-Z"
    },
    {
     "Business": "Photo\/video, lights & sounds services",
     "Zone": "C1-Z"
    },
    {
     "Business": "Catering services",
     "Zone": "C1-Z"
    },
    {
     "Business": "Event planners",
     "Zone": "C1-Z"
    },
    {
     "Business": "Water stations",
     "Zone": "C1-Z"
    },
    {
     "Business": "Courier services",
     "Zone": "C1-Z"
    },
    {
     "Business": "Security agencies",
     "Zone": "C1-Z"
    },
    {
     "Business": "Janitorial services",
     "Zone": "C1-Z"
    },
    {
     "Business": "Travel agencies",
     "Zone": "C1-Z"
    },
    {
     "Business": "Photo and portrait studio",
     "Zone": "C1-Z"
    },
    {
     "Business": "Bicycle repair shops",
     "Zone": "C1-Z"
    },
    {
     "Business": "Battery shops and repair shops",
     "Zone": "C1-Z"
    },
    {
     "Business": "Motor vehicles and accessory repair shops",
     "Zone": "C1-Z"
    },
    {
     "Business": "House furniture and appliances repair shops",
     "Zone": "C1-Z"
    },
    {
     "Business": "Repair shops for watches, bags, shoes, cellular phones, cameras, computers",
     "Zone": "C1-Z"
    },
    {
     "Business": "Lotto terminals",
     "Zone": "C1-Z"
    },
    {
     "Business": "Vocational\/technical school",
     "Zone": "C1-Z"
    },
    {
     "Business": "Special Education (SPED) school",
     "Zone": "C1-Z"
    },
    {
     "Business": "Car wash",
     "Zone": "C1-Z"
    },
    {
     "Business": "Gasoline filling stations\/services stations",
     "Zone": "C1-Z"
    },
    {
     "Business": "Engraving, photo developing and printing shops",
     "Zone": "C1-Z"
    },
    {
     "Business": "Printing, publication and graphics shops",
     "Zone": "C1-Z"
    },
    {
     "Business": "Manufacture of insignia, badges and similar emblems except metal",
     "Zone": "C1-Z"
    },
    {
     "Business": "Construction supply stores\/depots",
     "Zone": "C1-Z"
    },
    {
     "Business": "Funeral parlors",
     "Zone": "C1-Z"
    },
    {
     "Business": "Department stores",
     "Zone": "C2-Z"
    },
    {
     "Business": "Bookstores and office supply shops",
     "Zone": "C2-Z"
    },
    {
     "Business": "Art supplies and novelties",
     "Zone": "C2-Z"
    },
    {
     "Business": "Home appliance stores",
     "Zone": "C2-Z"
    },
    {
     "Business": "Car display and dealer stores",
     "Zone": "C2-Z"
    },
    {
     "Business": "Photo shops",
     "Zone": "C2-Z"
    },
    {
     "Business": "Flower shops",
     "Zone": "C2-Z"
    },
    {
     "Business": "Curio or antique shops",
     "Zone": "C2-Z"
    },
    {
     "Business": "Pet shops and aquarium stores",
     "Zone": "C2-Z"
    },
    {
     "Business": "Jewelry shops",
     "Zone": "C2-Z"
    },
    {
     "Business": "Consumer electronics such as cellular phones, cameras, laptops, home appliances and the like",
     "Zone": "C2-Z"
    },
    {
     "Business": "Drugstores",
     "Zone": "C2-Z"
    },
    {
     "Business": "Bakery, cake, pastry and delicatessen shops",
     "Zone": "C2-Z"
    },
    {
     "Business": "Liquor and wine stores",
     "Zone": "C2-Z"
    },
    {
     "Business": "Groceries",
     "Zone": "C2-Z"
    },
    {
     "Business": "Supermarkets",
     "Zone": "C2-Z"
    },
    {
     "Business": "Convenience stores",
     "Zone": "C2-Z"
    },
    {
     "Business": "Medical, dental, and similar clinics",
     "Zone": "C2-Z"
    },
    {
     "Business": "Beauty parlor",
     "Zone": "C2-Z"
    },
    {
     "Business": "Barber shop",
     "Zone": "C2-Z"
    },
    {
     "Business": "Wellness facilities such as sauna, spa, massage and facial clinics",
     "Zone": "C2-Z"
    },
    {
     "Business": "Dressmaking and tailoring shop",
     "Zone": "C2-Z"
    },
    {
     "Business": "Bayad centers",
     "Zone": "C2-Z"
    },
    {
     "Business": "Laundries",
     "Zone": "C2-Z"
    },
    {
     "Business": "Internet cafe and cyber stations",
     "Zone": "C2-Z"
    },
    {
     "Business": "Photo\/video, lights & sounds services",
     "Zone": "C2-Z"
    },
    {
     "Business": "Catering services",
     "Zone": "C2-Z"
    },
    {
     "Business": "Event planners",
     "Zone": "C2-Z"
    },
    {
     "Business": "Water stations",
     "Zone": "C2-Z"
    },
    {
     "Business": "Courier services",
     "Zone": "C2-Z"
    },
    {
     "Business": "Security agencies",
     "Zone": "C2-Z"
    },
    {
     "Business": "Janitorial services",
     "Zone": "C2-Z"
    },
    {
     "Business": "Travel agencies",
     "Zone": "C2-Z"
    },
    {
     "Business": "Photo and portrait studio",
     "Zone": "C2-Z"
    },
    {
     "Business": "Bicycle repair shops",
     "Zone": "C2-Z"
    },
    {
     "Business": "Battery shops and repair shops",
     "Zone": "C2-Z"
    },
    {
     "Business": "Motor vehicles and accessory repair shops",
     "Zone": "C2-Z"
    },
    {
     "Business": "House furniture and appliances repair shops",
     "Zone": "C2-Z"
    },
    {
     "Business": "Repair shops for watches, bags, shoes, cellular phones, cameras, computers",
     "Zone": "C2-Z"
    },
    {
     "Business": "Lotto terminals",
     "Zone": "C2-Z"
    },
    {
     "Business": "Vocational\/technical school",
     "Zone": "C2-Z"
    },
    {
     "Business": "Special Education (SPED) school",
     "Zone": "C2-Z"
    },
    {
     "Business": "Car wash",
     "Zone": "C2-Z"
    },
    {
     "Business": "Gasoline filling stations\/services stations",
     "Zone": "C2-Z"
    },
    {
     "Business": "Engraving, photo developing and printing shops",
     "Zone": "C2-Z"
    },
    {
     "Business": "Printing, publication and graphics shops",
     "Zone": "C2-Z"
    },
    {
     "Business": "Manufacture of insignia, badges and similar emblems except metal",
     "Zone": "C2-Z"
    },
    {
     "Business": "Construction supply stores\/depots",
     "Zone": "C2-Z"
    },
    {
     "Business": "Funeral parlors",
     "Zone": "C2-Z"
    },
    {
     "Business": "Wholesale stores",
     "Zone": "C2-Z"
    },
    {
     "Business": "Wet and dry markets",
     "Zone": "C2-Z"
    },
    {
     "Business": "Shopping centers, malls and supermarkets",
     "Zone": "C2-Z"
    },
    {
     "Business": "Recreational center\/establishments (Movie house\/theater, Stadium, coliseum, Tennis courts and sports complex, Billiard halls, pool rooms and bowling alleys, Sports clubhouses)",
     "Zone": "C2-Z"
    },
    {
     "Business": "Bars, sing-along lounges, bistros, pubs, beer gardens, disco, dance halls",
     "Zone": "C2-Z"
    },
    {
     "Business": "Business Process Outsourcing services",
     "Zone": "C2-Z"
    },
    {
     "Business": "Radio and television stations",
     "Zone": "C2-Z"
    },
    {
     "Business": "Printing\/typesetting, copiers and duplicating services",
     "Zone": "C2-Z"
    },
    {
     "Business": "Glassware and metal ware stores, household equipment and appliances",
     "Zone": "C2-Z"
    },
    {
     "Business": "Gravel and sand stores",
     "Zone": "C2-Z"
    },
    {
     "Business": "Lumber\/hardware",
     "Zone": "C2-Z"
    },
    {
     "Business": "Paint stores without bulk handling",
     "Zone": "C2-Z"
    },
    {
     "Business": "Gardens and landscaping supply\/contractors",
     "Zone": "C2-Z"
    },
    {
     "Business": "Manufacture of ice, ice blocks, cubes, tubes, crush except dry ice",
     "Zone": "C2-Z"
    },
    {
     "Business": "Lechon stores",
     "Zone": "C2-Z"
    },
    {
     "Business": "Lechon stores",
     "Zone": "C2-Z"
    },
    {
     "Business": "Biscuit factory",
     "Zone": "C2-Z"
    },
    {
     "Business": "Doughnut and hopia factory",
     "Zone": "C2-Z"
    },
    {
     "Business": "Department stores",
     "Zone": "C3-Z"
    },
    {
     "Business": "Bookstores and office supply shops",
     "Zone": "C3-Z"
    },
    {
     "Business": "Art supplies and novelties",
     "Zone": "C3-Z"
    },
    {
     "Business": "Home appliance stores",
     "Zone": "C3-Z"
    },
    {
     "Business": "Car display and dealer stores",
     "Zone": "C3-Z"
    },
    {
     "Business": "Photo shops",
     "Zone": "C3-Z"
    },
    {
     "Business": "Flower shops",
     "Zone": "C3-Z"
    },
    {
     "Business": "Curio or antique shops",
     "Zone": "C3-Z"
    },
    {
     "Business": "Pet shops and aquarium stores",
     "Zone": "C3-Z"
    },
    {
     "Business": "Jewelry shops",
     "Zone": "C3-Z"
    },
    {
     "Business": "Consumer electronics such as cellular phones, cameras, laptops, home appliances and the like",
     "Zone": "C3-Z"
    },
    {
     "Business": "Drugstores",
     "Zone": "C3-Z"
    },
    {
     "Business": "Bakery, cake, pastry and delicatessen shops",
     "Zone": "C3-Z"
    },
    {
     "Business": "Liquor and wine stores",
     "Zone": "C3-Z"
    },
    {
     "Business": "Groceries",
     "Zone": "C3-Z"
    },
    {
     "Business": "Supermarkets",
     "Zone": "C3-Z"
    },
    {
     "Business": "Convenience stores",
     "Zone": "C3-Z"
    },
    {
     "Business": "Medical, dental, and similar clinics",
     "Zone": "C3-Z"
    },
    {
     "Business": "Beauty parlor",
     "Zone": "C3-Z"
    },
    {
     "Business": "Barber shop",
     "Zone": "C3-Z"
    },
    {
     "Business": "Wellness facilities such as sauna, spa, massage and facial clinics",
     "Zone": "C3-Z"
    },
    {
     "Business": "Dressmaking and tailoring shop",
     "Zone": "C3-Z"
    },
    {
     "Business": "Bayad centers",
     "Zone": "C3-Z"
    },
    {
     "Business": "Laundries",
     "Zone": "C3-Z"
    },
    {
     "Business": "Internet cafe and cyber stations",
     "Zone": "C3-Z"
    },
    {
     "Business": "Photo\/video, lights & sounds services",
     "Zone": "C3-Z"
    },
    {
     "Business": "Catering services",
     "Zone": "C3-Z"
    },
    {
     "Business": "Event planners",
     "Zone": "C3-Z"
    },
    {
     "Business": "Water stations",
     "Zone": "C3-Z"
    },
    {
     "Business": "Courier services",
     "Zone": "C3-Z"
    },
    {
     "Business": "Security agencies",
     "Zone": "C3-Z"
    },
    {
     "Business": "Janitorial services",
     "Zone": "C3-Z"
    },
    {
     "Business": "Travel agencies",
     "Zone": "C3-Z"
    },
    {
     "Business": "Photo and portrait studio",
     "Zone": "C3-Z"
    },
    {
     "Business": "Bicycle repair shops",
     "Zone": "C3-Z"
    },
    {
     "Business": "Battery shops and repair shops",
     "Zone": "C3-Z"
    },
    {
     "Business": "Motor vehicles and accessory repair shops",
     "Zone": "C3-Z"
    },
    {
     "Business": "House furniture and appliances repair shops",
     "Zone": "C3-Z"
    },
    {
     "Business": "Repair shops for watches, bags, shoes, cellular phones, cameras, computers",
     "Zone": "C3-Z"
    },
    {
     "Business": "Lotto terminals",
     "Zone": "C3-Z"
    },
    {
     "Business": "Vocational\/technical school",
     "Zone": "C3-Z"
    },
    {
     "Business": "Special Education (SPED) school",
     "Zone": "C3-Z"
    },
    {
     "Business": "Car wash",
     "Zone": "C3-Z"
    },
    {
     "Business": "Gasoline filling stations\/services stations",
     "Zone": "C3-Z"
    },
    {
     "Business": "Engraving, photo developing and printing shops",
     "Zone": "C3-Z"
    },
    {
     "Business": "Printing, publication and graphics shops",
     "Zone": "C3-Z"
    },
    {
     "Business": "Manufacture of insignia, badges and similar emblems except metal",
     "Zone": "C3-Z"
    },
    {
     "Business": "Construction supply stores\/depots",
     "Zone": "C3-Z"
    },
    {
     "Business": "Funeral parlors",
     "Zone": "C3-Z"
    },
    {
     "Business": "Department stores",
     "Zone": "C3-Z"
    },
    {
     "Business": "Bookstores and office supply shops",
     "Zone": "C3-Z"
    },
    {
     "Business": "Art supplies and novelties",
     "Zone": "C3-Z"
    },
    {
     "Business": "Home appliance stores",
     "Zone": "C3-Z"
    },
    {
     "Business": "Car display and dealer stores",
     "Zone": "C3-Z"
    },
    {
     "Business": "Photo shops",
     "Zone": "C3-Z"
    },
    {
     "Business": "Flower shops",
     "Zone": "C3-Z"
    },
    {
     "Business": "Curio or antique shops",
     "Zone": "C3-Z"
    },
    {
     "Business": "Pet shops and aquarium stores",
     "Zone": "C3-Z"
    },
    {
     "Business": "Jewelry shops",
     "Zone": "C3-Z"
    },
    {
     "Business": "Consumer electronics such as cellular phones, cameras, laptops, home appliances and the like",
     "Zone": "C3-Z"
    },
    {
     "Business": "Drugstores",
     "Zone": "C3-Z"
    },
    {
     "Business": "Bakery, cake, pastry and delicatessen shops",
     "Zone": "C3-Z"
    },
    {
     "Business": "Liquor and wine stores",
     "Zone": "C3-Z"
    },
    {
     "Business": "Groceries",
     "Zone": "C3-Z"
    },
    {
     "Business": "Supermarkets",
     "Zone": "C3-Z"
    },
    {
     "Business": "Convenience stores",
     "Zone": "C3-Z"
    },
    {
     "Business": "Medical, dental, and similar clinics",
     "Zone": "C3-Z"
    },
    {
     "Business": "Beauty parlor",
     "Zone": "C3-Z"
    },
    {
     "Business": "Barber shop",
     "Zone": "C3-Z"
    },
    {
     "Business": "Wellness facilities such as sauna, spa, massage and facial clinics",
     "Zone": "C3-Z"
    },
    {
     "Business": "Dressmaking and tailoring shop",
     "Zone": "C3-Z"
    },
    {
     "Business": "Bayad centers",
     "Zone": "C3-Z"
    },
    {
     "Business": "Laundries",
     "Zone": "C3-Z"
    },
    {
     "Business": "Internet cafe and cyber stations",
     "Zone": "C3-Z"
    },
    {
     "Business": "Photo\/video, lights & sounds services",
     "Zone": "C3-Z"
    },
    {
     "Business": "Catering services",
     "Zone": "C3-Z"
    },
    {
     "Business": "Event planners",
     "Zone": "C3-Z"
    },
    {
     "Business": "Water stations",
     "Zone": "C3-Z"
    },
    {
     "Business": "Courier services",
     "Zone": "C3-Z"
    },
    {
     "Business": "Security agencies",
     "Zone": "C3-Z"
    },
    {
     "Business": "Janitorial services",
     "Zone": "C3-Z"
    },
    {
     "Business": "Travel agencies",
     "Zone": "C3-Z"
    },
    {
     "Business": "Photo and portrait studio",
     "Zone": "C3-Z"
    },
    {
     "Business": "Bicycle repair shops",
     "Zone": "C3-Z"
    },
    {
     "Business": "Battery shops and repair shops",
     "Zone": "C3-Z"
    },
    {
     "Business": "Motor vehicles and accessory repair shops",
     "Zone": "C3-Z"
    },
    {
     "Business": "House furniture and appliances repair shops",
     "Zone": "C3-Z"
    },
    {
     "Business": "Repair shops for watches, bags, shoes, cellular phones, cameras, computers",
     "Zone": "C3-Z"
    },
    {
     "Business": "Lotto terminals",
     "Zone": "C3-Z"
    },
    {
     "Business": "Vocational\/technical school",
     "Zone": "C3-Z"
    },
    {
     "Business": "Special Education (SPED) school",
     "Zone": "C3-Z"
    },
    {
     "Business": "Car wash",
     "Zone": "C3-Z"
    },
    {
     "Business": "Gasoline filling stations\/services stations",
     "Zone": "C3-Z"
    },
    {
     "Business": "Engraving, photo developing and printing shops",
     "Zone": "C3-Z"
    },
    {
     "Business": "Printing, publication and graphics shops",
     "Zone": "C3-Z"
    },
    {
     "Business": "Manufacture of insignia, badges and similar emblems except metal",
     "Zone": "C3-Z"
    },
    {
     "Business": "Construction supply stores\/depots",
     "Zone": "C3-Z"
    },
    {
     "Business": "Funeral parlors",
     "Zone": "C3-Z"
    },
    {
     "Business": "Wholesale stores",
     "Zone": "C3-Z"
    },
    {
     "Business": "Wet and dry markets",
     "Zone": "C3-Z"
    },
    {
     "Business": "Shopping centers, malls and supermarkets",
     "Zone": "C3-Z"
    },
    {
     "Business": "Recreational center\/establishments (Movie house\/theater, Stadium, coliseum, Tennis courts and sports complex, Billiard halls, pool rooms and bowling alleys, Sports clubhouses)",
     "Zone": "C3-Z"
    },
    {
     "Business": "Bars, sing-along lounges, bistros, pubs, beer gardens, disco, dance halls",
     "Zone": "C3-Z"
    },
    {
     "Business": "Business Process Outsourcing services",
     "Zone": "C3-Z"
    },
    {
     "Business": "Radio and television stations",
     "Zone": "C3-Z"
    },
    {
     "Business": "Printing\/typesetting, copiers and duplicating services",
     "Zone": "C3-Z"
    },
    {
     "Business": "Glassware and metal ware stores, household equipment and appliances",
     "Zone": "C3-Z"
    },
    {
     "Business": "Gravel and sand stores",
     "Zone": "C3-Z"
    },
    {
     "Business": "Lumber\/hardware",
     "Zone": "C3-Z"
    },
    {
     "Business": "Paint stores without bulk handling",
     "Zone": "C3-Z"
    },
    {
     "Business": "Gardens and landscaping supply\/contractors",
     "Zone": "C3-Z"
    },
    {
     "Business": "Manufacture of ice, ice blocks, cubes, tubes, crush except dry ice",
     "Zone": "C3-Z"
    },
    {
     "Business": "Lechon stores",
     "Zone": "C3-Z"
    },
    {
     "Business": "Lechon stores",
     "Zone": "C3-Z"
    },
    {
     "Business": "Biscuit factory",
     "Zone": "C3-Z"
    },
    {
     "Business": "Doughnut and hopia factory",
     "Zone": "C3-Z"
    },
    {
     "Business": "Wholesale stores",
     "Zone": "GC-Z"
    },
    {
     "Business": "Wet and dry markets",
     "Zone": "GC-Z"
    },
    {
     "Business": "Shopping center, malls and supermarkets",
     "Zone": "GC-Z"
    },
    {
     "Business": "Retail stores and shops",
     "Zone": "GC-Z"
    },
    {
     "Business": "Food market and shops",
     "Zone": "GC-Z"
    },
    {
     "Business": "Bayad centers",
     "Zone": "GC-Z"
    },
    {
     "Business": "Laundries",
     "Zone": "GC-Z"
    },
    {
     "Business": "Internet cafe and cyber stations",
     "Zone": "GC-Z"
    },
    {
     "Business": "Photo\/video, lights & sounds services",
     "Zone": "GC-Z"
    },
    {
     "Business": "Catering services",
     "Zone": "GC-Z"
    },
    {
     "Business": "Event planners",
     "Zone": "GC-Z"
    },
    {
     "Business": "Water stations",
     "Zone": "GC-Z"
    },
    {
     "Business": "Courier services",
     "Zone": "GC-Z"
    },
    {
     "Business": "Security agencies",
     "Zone": "GC-Z"
    },
    {
     "Business": "Janitorial services",
     "Zone": "GC-Z"
    },
    {
     "Business": "Travel agencies",
     "Zone": "GC-Z"
    },
    {
     "Business": "Restaurants and other eateries",
     "Zone": "GC-Z"
    },
    {
     "Business": "Construction supply stores\/ depots",
     "Zone": "GC-Z"
    },
    {
     "Business": "Lumber\/hardware",
     "Zone": "GC-Z"
    },
    {
     "Business": "Lechon stores",
     "Zone": "GC-Z"
    },
    {
     "Business": "Chicharon factory",
     "Zone": "GC-Z"
    },
    {
     "Business": "Manufacture of rattan furniture including upholstered",
     "Zone": "GC-Z"
    },
    {
     "Business": "Manufacture of box beds and mattresses",
     "Zone": "GC-Z"
    },
    {
     "Business": "Department stores",
     "Zone": "CBD"
    },
    {
     "Business": "Bookstores and office supply shops",
     "Zone": "CBD"
    },
    {
     "Business": "Art supplies and novelties",
     "Zone": "CBD"
    },
    {
     "Business": "Home appliance stores",
     "Zone": "CBD"
    },
    {
     "Business": "Car display and dealer stores",
     "Zone": "CBD"
    },
    {
     "Business": "Photo shops",
     "Zone": "CBD"
    },
    {
     "Business": "Flower shops",
     "Zone": "CBD"
    },
    {
     "Business": "Curio or antique shops",
     "Zone": "CBD"
    },
    {
     "Business": "Pet shops and aquarium stores",
     "Zone": "CBD"
    },
    {
     "Business": "Jewelry shops",
     "Zone": "CBD"
    },
    {
     "Business": "Consumer electronics such as cellular phones, cameras, laptops, home appliances and the like",
     "Zone": "CBD"
    },
    {
     "Business": "Drugstores",
     "Zone": "CBD"
    },
    {
     "Business": "Bakery, cake, pastry and delicatessen shops",
     "Zone": "CBD"
    },
    {
     "Business": "Liquor and wine stores",
     "Zone": "CBD"
    },
    {
     "Business": "Groceries",
     "Zone": "CBD"
    },
    {
     "Business": "Supermarkets",
     "Zone": "CBD"
    },
    {
     "Business": "Convenience stores",
     "Zone": "CBD"
    },
    {
     "Business": "Medical, dental, and similar clinics",
     "Zone": "CBD"
    },
    {
     "Business": "Beauty parlor",
     "Zone": "CBD"
    },
    {
     "Business": "Barber shop",
     "Zone": "CBD"
    },
    {
     "Business": "Wellness facilities such as sauna, spa, massage and facial clinics",
     "Zone": "CBD"
    },
    {
     "Business": "Dressmaking and tailoring shop",
     "Zone": "CBD"
    },
    {
     "Business": "Bayad centers",
     "Zone": "CBD"
    },
    {
     "Business": "Laundries",
     "Zone": "CBD"
    },
    {
     "Business": "Internet cafe and cyber stations",
     "Zone": "CBD"
    },
    {
     "Business": "Photo\/video, lights & sounds services",
     "Zone": "CBD"
    },
    {
     "Business": "Catering services",
     "Zone": "CBD"
    },
    {
     "Business": "Event planners",
     "Zone": "CBD"
    },
    {
     "Business": "Water stations",
     "Zone": "CBD"
    },
    {
     "Business": "Courier services",
     "Zone": "CBD"
    },
    {
     "Business": "Security agencies",
     "Zone": "CBD"
    },
    {
     "Business": "Janitorial services",
     "Zone": "CBD"
    },
    {
     "Business": "Travel agencies",
     "Zone": "CBD"
    },
    {
     "Business": "Photo and portrait studio",
     "Zone": "CBD"
    },
    {
     "Business": "Bicycle repair shops",
     "Zone": "CBD"
    },
    {
     "Business": "Battery shops and repair shops",
     "Zone": "CBD"
    },
    {
     "Business": "Motor vehicles and accessory repair shops",
     "Zone": "CBD"
    },
    {
     "Business": "House furniture and appliances repair shops",
     "Zone": "CBD"
    },
    {
     "Business": "Repair shops for watches, bags, shoes, cellular phones, cameras, computers",
     "Zone": "CBD"
    },
    {
     "Business": "Lotto terminals",
     "Zone": "CBD"
    },
    {
     "Business": "Vocational\/technical school",
     "Zone": "CBD"
    },
    {
     "Business": "Special Education (SPED) school",
     "Zone": "CBD"
    },
    {
     "Business": "Car wash",
     "Zone": "CBD"
    },
    {
     "Business": "Gasoline filling stations\/services stations",
     "Zone": "CBD"
    },
    {
     "Business": "Engraving, photo developing and printing shops",
     "Zone": "CBD"
    },
    {
     "Business": "Printing, publication and graphics shops",
     "Zone": "CBD"
    },
    {
     "Business": "Manufacture of insignia, badges and similar emblems except metal",
     "Zone": "CBD"
    },
    {
     "Business": "Construction supply stores\/depots",
     "Zone": "CBD"
    },
    {
     "Business": "Funeral parlors",
     "Zone": "CBD"
    },
    {
     "Business": "Department stores",
     "Zone": "CBD"
    },
    {
     "Business": "Bookstores and office supply shops",
     "Zone": "CBD"
    },
    {
     "Business": "Art supplies and novelties",
     "Zone": "CBD"
    },
    {
     "Business": "Home appliance stores",
     "Zone": "CBD"
    },
    {
     "Business": "Car display and dealer stores",
     "Zone": "CBD"
    },
    {
     "Business": "Photo shops",
     "Zone": "CBD"
    },
    {
     "Business": "Flower shops",
     "Zone": "CBD"
    },
    {
     "Business": "Curio or antique shops",
     "Zone": "CBD"
    },
    {
     "Business": "Pet shops and aquarium stores",
     "Zone": "CBD"
    },
    {
     "Business": "Jewelry shops",
     "Zone": "CBD"
    },
    {
     "Business": "Consumer electronics such as cellular phones, cameras, laptops, home appliances and the like",
     "Zone": "CBD"
    },
    {
     "Business": "Drugstores",
     "Zone": "CBD"
    },
    {
     "Business": "Bakery, cake, pastry and delicatessen shops",
     "Zone": "CBD"
    },
    {
     "Business": "Liquor and wine stores",
     "Zone": "CBD"
    },
    {
     "Business": "Groceries",
     "Zone": "CBD"
    },
    {
     "Business": "Supermarkets",
     "Zone": "CBD"
    },
    {
     "Business": "Convenience stores",
     "Zone": "CBD"
    },
    {
     "Business": "Medical, dental, and similar clinics",
     "Zone": "CBD"
    },
    {
     "Business": "Beauty parlor",
     "Zone": "CBD"
    },
    {
     "Business": "Barber shop",
     "Zone": "CBD"
    },
    {
     "Business": "Wellness facilities such as sauna, spa, massage and facial clinics",
     "Zone": "CBD"
    },
    {
     "Business": "Dressmaking and tailoring shop",
     "Zone": "CBD"
    },
    {
     "Business": "Bayad centers",
     "Zone": "CBD"
    },
    {
     "Business": "Laundries",
     "Zone": "CBD"
    },
    {
     "Business": "Internet cafe and cyber stations",
     "Zone": "CBD"
    },
    {
     "Business": "Photo\/video, lights & sounds services",
     "Zone": "CBD"
    },
    {
     "Business": "Catering services",
     "Zone": "CBD"
    },
    {
     "Business": "Event planners",
     "Zone": "CBD"
    },
    {
     "Business": "Water stations",
     "Zone": "CBD"
    },
    {
     "Business": "Courier services",
     "Zone": "CBD"
    },
    {
     "Business": "Security agencies",
     "Zone": "CBD"
    },
    {
     "Business": "Janitorial services",
     "Zone": "CBD"
    },
    {
     "Business": "Travel agencies",
     "Zone": "CBD"
    },
    {
     "Business": "Photo and portrait studio",
     "Zone": "CBD"
    },
    {
     "Business": "Bicycle repair shops",
     "Zone": "CBD"
    },
    {
     "Business": "Battery shops and repair shops",
     "Zone": "CBD"
    },
    {
     "Business": "Motor vehicles and accessory repair shops",
     "Zone": "CBD"
    },
    {
     "Business": "House furniture and appliances repair shops",
     "Zone": "CBD"
    },
    {
     "Business": "Repair shops for watches, bags, shoes, cellular phones, cameras, computers",
     "Zone": "CBD"
    },
    {
     "Business": "Lotto terminals",
     "Zone": "CBD"
    },
    {
     "Business": "Vocational\/technical school",
     "Zone": "CBD"
    },
    {
     "Business": "Special Education (SPED) school",
     "Zone": "CBD"
    },
    {
     "Business": "Car wash",
     "Zone": "CBD"
    },
    {
     "Business": "Gasoline filling stations\/services stations",
     "Zone": "CBD"
    },
    {
     "Business": "Engraving, photo developing and printing shops",
     "Zone": "CBD"
    },
    {
     "Business": "Printing, publication and graphics shops",
     "Zone": "CBD"
    },
    {
     "Business": "Manufacture of insignia, badges and similar emblems except metal",
     "Zone": "CBD"
    },
    {
     "Business": "Construction supply stores\/depots",
     "Zone": "CBD"
    },
    {
     "Business": "Funeral parlors",
     "Zone": "CBD"
    },
    {
     "Business": "Wholesale stores",
     "Zone": "CBD"
    },
    {
     "Business": "Wet and dry markets",
     "Zone": "CBD"
    },
    {
     "Business": "Shopping centers, malls and supermarkets",
     "Zone": "CBD"
    },
    {
     "Business": "Recreational center\/establishments (Movie house\/theater, Stadium, coliseum, Tennis courts and sports complex, Billiard halls, pool rooms and bowling alleys, Sports clubhouses)",
     "Zone": "CBD"
    },
    {
     "Business": "Bars, sing-along lounges, bistros, pubs, beer gardens, disco, dance halls",
     "Zone": "CBD"
    },
    {
     "Business": "Business Process Outsourcing services",
     "Zone": "CBD"
    },
    {
     "Business": "Radio and television stations",
     "Zone": "CBD"
    },
    {
     "Business": "Printing\/typesetting, copiers and duplicating services",
     "Zone": "CBD"
    },
    {
     "Business": "Glassware and metal ware stores, household equipment and appliances",
     "Zone": "CBD"
    },
    {
     "Business": "Gravel and sand stores",
     "Zone": "CBD"
    },
    {
     "Business": "Lumber\/hardware",
     "Zone": "CBD"
    },
    {
     "Business": "Paint stores without bulk handling",
     "Zone": "CBD"
    },
    {
     "Business": "Gardens and landscaping supply\/contractors",
     "Zone": "CBD"
    },
    {
     "Business": "Manufacture of ice, ice blocks, cubes, tubes, crush except dry ice",
     "Zone": "CBD"
    },
    {
     "Business": "Lechon stores",
     "Zone": "CBD"
    },
    {
     "Business": "Lechon stores",
     "Zone": "CBD"
    },
    {
     "Business": "Biscuit factory",
     "Zone": "CBD"
    },
    {
     "Business": "Doughnut and hopia factory",
     "Zone": "CBD"
    },
    {
     "Business": "Wholesale stores",
     "Zone": "CBD"
    },
    {
     "Business": "Wet and dry markets",
     "Zone": "CBD"
    },
    {
     "Business": "Shopping center, malls and supermarkets",
     "Zone": "CBD"
    },
    {
     "Business": "Retail stores and shops",
     "Zone": "CBD"
    },
    {
     "Business": "Food market and shops",
     "Zone": "CBD"
    },
    {
     "Business": "Bayad centers",
     "Zone": "CBD"
    },
    {
     "Business": "Laundries",
     "Zone": "CBD"
    },
    {
     "Business": "Internet cafe and cyber stations",
     "Zone": "CBD"
    },
    {
     "Business": "Photo\/video, lights & sounds services",
     "Zone": "CBD"
    },
    {
     "Business": "Catering services",
     "Zone": "CBD"
    },
    {
     "Business": "Event planners",
     "Zone": "CBD"
    },
    {
     "Business": "Water stations",
     "Zone": "CBD"
    },
    {
     "Business": "Courier services",
     "Zone": "CBD"
    },
    {
     "Business": "Security agencies",
     "Zone": "CBD"
    },
    {
     "Business": "Janitorial services",
     "Zone": "CBD"
    },
    {
     "Business": "Travel agencies",
     "Zone": "CBD"
    },
    {
     "Business": "Restaurants and other eateries",
     "Zone": "CBD"
    },
    {
     "Business": "Construction supply stores\/ depots",
     "Zone": "CBD"
    },
    {
     "Business": "Lumber\/hardware",
     "Zone": "CBD"
    },
    {
     "Business": "Lechon stores",
     "Zone": "CBD"
    },
    {
     "Business": "Chicharon factory",
     "Zone": "CBD"
    },
    {
     "Business": "Manufacture of rattan furniture including upholstered",
     "Zone": "CBD"
    },
    {
     "Business": "Manufacture of box beds and mattresses",
     "Zone": "CBD"
    },
    {
     "Business": "Bus Terminals",
     "Zone": "CBD"
    },
    {
     "Business": "Commercial Condominium",
     "Zone": "CBD"
    },
    {
     "Business": "Drying fish",
     "Zone": "I1-Z"
    },
    {
     "Business": "Biscuit factory-manufacture of biscuits, cookies, crackers",
     "Zone": "I1-Z"
    },
    {
     "Business": "Doughnut and hopia factory",
     "Zone": "I1-Z"
    },
    {
     "Business": "Manufacture of macaroni, spaghetti, vermicelli and other noodles",
     "Zone": "I1-Z"
    },
    {
     "Business": "Life belts factory",
     "Zone": "I1-Z"
    },
    {
     "Business": "Manufacture of luggage, handbags, wallets and small leather goods",
     "Zone": "I1-Z"
    },
    {
     "Business": "Manufacture of miscellaneous products of leather and leather substitute and n.e.c.",
     "Zone": "I1-Z"
    },
    {
     "Business": "Manufacture of shoes except rubber, plastic and wood",
     "Zone": "I1-Z"
    },
    {
     "Business": "Manufacture of slipper and sandal except rubber and plastic",
     "Zone": "I1-Z"
    },
    {
     "Business": "Manufacture of footwear parts except rubber and plastic",
     "Zone": "I1-Z"
    },
    {
     "Business": "Printing, publishing and allied industries and those n.e.c.",
     "Zone": "I1-Z"
    },
    {
     "Business": "Renovation and repair of office machinery",
     "Zone": "I1-Z"
    },
    {
     "Business": "Manufacture of children vehicles and baby carriages",
     "Zone": "I1-Z"
    },
    {
     "Business": "Ice plants and cold storage buildings",
     "Zone": "I1-Z"
    },
    {
     "Business": "Quick freezing and cold packaging for fish and other seafoods",
     "Zone": "I1-Z"
    },
    {
     "Business": "Quick freezing and cold packaging for fruits and vegetables",
     "Zone": "I1-Z"
    },
    {
     "Business": "Popcorn\/rice factory",
     "Zone": "I1-Z"
    },
    {
     "Business": "Manufacture of optical lenses",
     "Zone": "I1-Z"
    },
    {
     "Business": "Manufacture of toys and dolls except rubber and mold plastic",
     "Zone": "I1-Z"
    },
    {
     "Business": "Manufacture of umbrella and canes",
     "Zone": "I1-Z"
    },
    {
     "Business": "Dairies and creameries",
     "Zone": "I1-Z"
    },
    {
     "Business": "Textile bag factories",
     "Zone": "I1-Z"
    },
    {
     "Business": "Manufacturing and canning of ham, bacon and native sausage",
     "Zone": "I2-Z"
    },
    {
     "Business": "Poultry processing and canning",
     "Zone": "I2-Z"
    },
    {
     "Business": "Large-scale manufacturing of ice cream",
     "Zone": "I2-Z"
    },
    {
     "Business": "Ice plants and cold storage",
     "Zone": "I2-Z"
    },
    {
     "Business": "Corn mill\/rice mill",
     "Zone": "I2-Z"
    },
    {
     "Business": "Chocolate and cocoa factory",
     "Zone": "I2-Z"
    },
    {
     "Business": "Candy factory",
     "Zone": "I2-Z"
    },
    {
     "Business": "Chewing gum factory",
     "Zone": "I2-Z"
    },
    {
     "Business": "Peanuts and other nuts factory",
     "Zone": "I2-Z"
    },
    {
     "Business": "Manufacture of other electronic equipment and apparatus n.e.c.",
     "Zone": "I2-Z"
    },
    {
     "Business": "Manufacture of coffee",
     "Zone": "I2-Z"
    },
    {
     "Business": "Cigar and cigarette factory",
     "Zone": "I2-Z"
    },
    {
     "Business": "Memorial Parks",
     "Zone": "CMP-Z"
    },
    {
     "Business": "Cemetery",
     "Zone": "CMP-Z"
    },
    {
     "Business": "Columbarium",
     "Zone": "CMP-Z"
    }
   ]

   export default businessTypes;