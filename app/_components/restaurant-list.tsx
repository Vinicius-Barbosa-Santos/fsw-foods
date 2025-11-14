import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import RestaurantItem from "./restaurant-item";
import { authOptions } from "../_lib/auth";

const RestaurantList = async () => {
  const session = await getServerSession(authOptions);

  // TODO: pegar restaurantes com maior número de pedidos
  const restaurants = await db.restaurant.findMany({ take: 10 });
  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: { userId: session?.user?.id },
  });

  console.log(userFavoriteRestaurants);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex w-full flex-col gap-6 px-5 md:grid md:grid-cols-3 md:gap-10 md:px-5">
        {restaurants.map((restaurant) => (
          <RestaurantItem
            key={restaurant.id}
            restaurant={restaurant}
            className="min-w-full max-w-full md:w-full md:min-w-0 md:max-w-none"
            userId={session?.user?.id}
            userFavoriteRestaurants={userFavoriteRestaurants}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
