import { AbilityBuilder, createMongoAbility } from "@casl/ability";

export default function defineAbilityFor(user: { role: string }) {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

  switch (user.role) {
    case "admin":
      can("manage", "all"); // read-write access to everything
      break;
    case "editor":
      can("read", "User");
      can("manage", "Book");
      break;
    case "member":
      can("read", "Book");
      can("update", "Book", ["borrowed"]);
      break;
  }

  return build();
}
