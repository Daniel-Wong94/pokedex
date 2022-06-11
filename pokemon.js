class Pokemon {
  constructor(
    name,
    id,
    height,
    weight,
    types,
    front_default,
    back_default,
    front_female,
    back_female,
    front_shiny,
    back_shiny,
    front_shiny_female,
    back_shiny_female,
    descriptions
  ) {
    (this.name = name),
      (this.id = id),
      (this.height = height / 10),
      (this.weight = weight / 10),
      (this.types = types),
      (this.front_male_default = front_default),
      (this.back_male_default = back_default),
      (this.front_female_default = front_female),
      (this.back_female_default = back_female),
      (this.front_male_shiny = front_shiny),
      (this.back_male_shiny = back_shiny),
      (this.front_female_shiny = front_shiny_female),
      (this.back_female_shiny = back_shiny_female),
      (this.descriptions = descriptions),
      (this.scrollIndex = 0);
  }
}
