const products = [
  {
    name: "Velcro Ballerinas For Girls  (Pink)",
    image: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa62XYMLfraUCIE5UyHDv4ysmlzHr0SbpDALGrZ9GiFJPxfS2-lbUYaVXrk_mAMmuip0Y&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa62XYMLfraUCIE5UyHDv4ysmlzHr0SbpDALGrZ9GiFJPxfS2-lbUYaVXrk_mAMmuip0Y&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa62XYMLfraUCIE5UyHDv4ysmlzHr0SbpDALGrZ9GiFJPxfS2-lbUYaVXrk_mAMmuip0Y&usqp=CAU",
            ],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    price: 89,
    countInStock: 3,
    rating: 4,
    numReviews: 4,
  },
  {
    name: "Velcro Sneakers For Boys & Girls  (Blue)",
    image: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa62XYMLfraUCIE5UyHDv4ysmlzHr0SbpDALGrZ9GiFJPxfS2-lbUYaVXrk_mAMmuip0Y&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa62XYMLfraUCIE5UyHDv4ysmlzHr0SbpDALGrZ9GiFJPxfS2-lbUYaVXrk_mAMmuip0Y&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa62XYMLfraUCIE5UyHDv4ysmlzHr0SbpDALGrZ9GiFJPxfS2-lbUYaVXrk_mAMmuip0Y&usqp=CAU",
            ],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    price: 599,
    countInStock: 10,
    rating: 2,
    numReviews: 2,
  },
  {
    name: "Sint adipisicing occaecat fugiat cupidatat veniam non Lorem quis.",
    image: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa62XYMLfraUCIE5UyHDv4ysmlzHr0SbpDALGrZ9GiFJPxfS2-lbUYaVXrk_mAMmuip0Y&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa62XYMLfraUCIE5UyHDv4ysmlzHr0SbpDALGrZ9GiFJPxfS2-lbUYaVXrk_mAMmuip0Y&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa62XYMLfraUCIE5UyHDv4ysmlzHr0SbpDALGrZ9GiFJPxfS2-lbUYaVXrk_mAMmuip0Y&usqp=CAU",
            ],    
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    price: 929,
    countInStock: 0,
    rating: 3.5,
    numReviews: 3,
  },
  {
    name: "Lace Casual Boots For Boys & Girls  (Tan)",
    image: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa62XYMLfraUCIE5UyHDv4ysmlzHr0SbpDALGrZ9GiFJPxfS2-lbUYaVXrk_mAMmuip0Y&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa62XYMLfraUCIE5UyHDv4ysmlzHr0SbpDALGrZ9GiFJPxfS2-lbUYaVXrk_mAMmuip0Y&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa62XYMLfraUCIE5UyHDv4ysmlzHr0SbpDALGrZ9GiFJPxfS2-lbUYaVXrk_mAMmuip0Y&usqp=CAU",
            ],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    price: 399,
    countInStock: 10,
    rating: 5,
    numReviews: 9,
  },
  {
    name: "Lace Walking Shoes For Boys & Girls  (Pink)",
    image: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa62XYMLfraUCIE5UyHDv4ysmlzHr0SbpDALGrZ9GiFJPxfS2-lbUYaVXrk_mAMmuip0Y&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa62XYMLfraUCIE5UyHDv4ysmlzHr0SbpDALGrZ9GiFJPxfS2-lbUYaVXrk_mAMmuip0Y&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa62XYMLfraUCIE5UyHDv4ysmlzHr0SbpDALGrZ9GiFJPxfS2-lbUYaVXrk_mAMmuip0Y&usqp=CAU",
            ],   
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    price: 49,
    countInStock: 7,
    rating: 2,
    numReviews: 2,
  },
  {
    name: "Women Red Heels Sandal",
    image: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa62XYMLfraUCIE5UyHDv4ysmlzHr0SbpDALGrZ9GiFJPxfS2-lbUYaVXrk_mAMmuip0Y&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa62XYMLfraUCIE5UyHDv4ysmlzHr0SbpDALGrZ9GiFJPxfS2-lbUYaVXrk_mAMmuip0Y&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa62XYMLfraUCIE5UyHDv4ysmlzHr0SbpDALGrZ9GiFJPxfS2-lbUYaVXrk_mAMmuip0Y&usqp=CAU",
            ],
    description:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDKJUcP9qtFUokZfjDEL4WBMra1VyXKlrKrA&usqp=CAU",
    price: 29,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  },
];

export default products;
