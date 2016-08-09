defmodule RetailScore.Demographic do
  use RetailScore.Web, :model

  alias RetailScore.Repo

  schema "demographics" do
    field :esri_variable, :string
    field :value, :float
    field :distance, :float
    belongs_to :property, RetailScore.Property

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:esri_variable, :value, :distance, :property_id])
    |> validate_required([:esri_variable, :value, :distance, :property_id])
  end

  # Esri Account Credentials
  @esri_client_id "lpCIeD2LSd3f0NSK"
  @esri_client_secret "750385b9fd9e4093ad995fdb21c48c1a"
  # Esri Query URL Specific Info
  @esri_url "http://geoenrich.arcgis.com/arcgis/rest/services/World/geoenrichmentserver/Geoenrichment/Enrich?"
  @study_areas ~s(studyAreas=[{%22areaType%22:%22RingBuffer%22,%22bufferUnits%22:%22esriMiles%22,%22bufferRadii%22:[1],%22geometry%22:)
  @study_area_options ~s(studyAreaOptions=[{%22areaType%22:%22RingBuffer%22,%22bufferUnits%22:%22esriMiles%22,%22bufferRadii%22:[1]}])
  @rs_study_areas ~s(studyAreas=[{%22areaType%22:%22RingBuffer%22,%22bufferUnits%22:%22esriKilometers%22,%22bufferRadii%22:[0.5],%22geometry%22:)
  @rs_study_area_options ~s(studyAreaOptions=[{%22areaType%22:%22RingBuffer%22,%22bufferUnits%22:%22esriKilometers%22,%22bufferRadii%22:[0.5]}])
  @rs_variables [
              {"X5001_X", "clothing.X5001_X"},
              {"X1131_X", "food.X1131_X"},
              {"X10001_X", "HealthPersonalCareCEX.X10001_X"},
              {"X9001_X", "entertainment.X9001_X"}
  ]
  @idCode "myId"
  @variables [ # Income Demographic Variables
              {"HINC0_CY", "householdincome.HINC0_CY"},
              {"HINC15_CY", "householdincome.HINC15_CY"},
              {"HINC25_CY", "householdincome.HINC25_CY"},
              {"HINC35_CY", "householdincome.HINC35_CY"},
              {"HINC50_CY", "householdincome.HINC50_CY"},
              {"HINC75_CY", "householdincome.HINC75_CY"},
              {"HINC100_CY", "householdincome.HINC100_CY"},
              {"HINC150_CY", "householdincome.HINC150_CY"},
              {"HINC200_CY", "householdincome.HINC200_CY"},
              {"AVGHINC_CY", "householdincome.AVGHINC_CY"},
              # Ethnicity Demographic Variables
              {"NHSPWHT_CY", "raceandhispanicorigin.NHSPWHT_CY"},
              {"NHSPBLK_CY", "raceandhispanicorigin.NHSPBLK_CY"},
              {"NHSPAI_CY", "raceandhispanicorigin.NHSPAI_CY"},
              {"NHSPASN_CY", "raceandhispanicorigin.NHSPASN_CY"},
              {"NHSPPI_CY", "raceandhispanicorigin.NHSPPI_CY"},
              {"NHSPOTH_CY", "raceandhispanicorigin.NHSPOTH_CY"},
              {"NHSPMLT_CY", "raceandhispanicorigin.NHSPMLT_CY"},
              {"HISPPOP_CY", "raceandhispanicorigin.HISPPOP_CY"},
              # Marital Status Demographic Variables
              {"MARRIED_CY", "maritalstatustotals.MARRIED_CY"},
              {"NEVMARR_CY", "maritalstatustotals.NEVMARR_CY"},
              {"WIDOWED_CY", "maritalstatustotals.WIDOWED_CY"},
              {"DIVORCD_CY", "maritalstatustotals.DIVORCD_CY"},
              # Gender Demographic Variables
              {"MALES_CY", "gender.MALES_CY"},
              {"FEMALES_CY", "gender.FEMALES_CY"},
              # Age Demographic Variables
              {"POP0_CY", "5yearincrements.POP0_CY"},
              {"POP5_CY", "5yearincrements.POP5_CY"},
              {"POP10_CY", "5yearincrements.POP10_CY"},
              {"POP15_CY", "5yearincrements.POP15_CY"},
              {"POP20_CY", "5yearincrements.POP20_CY"},
              {"POP25_CY", "5yearincrements.POP25_CY"},
              {"POP30_CY", "5yearincrements.POP30_CY"},
              {"POP35_CY", "5yearincrements.POP35_CY"},
              {"POP40_CY", "5yearincrements.POP40_CY"},
              {"POP45_CY", "5yearincrements.POP45_CY"},
              {"POP50_CY", "5yearincrements.POP50_CY"},
              {"POP55_CY", "5yearincrements.POP55_CY"},
              {"POP60_CY", "5yearincrements.POP60_CY"},
              {"POP65_CY", "5yearincrements.POP65_CY"},
              {"POP70_CY", "5yearincrements.POP70_CY"},
              {"POP75_CY", "5yearincrements.POP75_CY"},
              {"POP80_CY", "5yearincrements.POP80_CY"},
              {"POP85_CY", "5yearincrements.POP85_CY"},
              # Tapestry Info Variables
              {"TSEGNUM", "tapestryhouseholdsNEW.TSEGNUM"}]

  # Tapestry Segments by TSEGNUM
  @tapestrySegments %{
    1.0 => ~s(These residents earn more than three times the US household income.
              They have the purchasing power to indulge any choice,
              but what do their hearts’ desire? Aside from the obvious
              expense for the upkeep of their lavish homes, consumers
              select upscale salons, spas, and fi tness centers for their
              personal well-being and shop at high-end retailers for their
              personal effects. Whether short or long, domestic or foreign,
              their frequent vacations spare no expense. Residents fi ll
              their weekends and evenings with opera, classical music
              concerts, charity dinners, and shopping. These highly
              educated professionals have reached their corporate career
              goals. With an accumulated average net worth of over
              1.5 million dollars and income from a strong investment
              portfolio, many of these older residents have moved
              into consulting roles or operate their own businesses.),
    2.0 => ~s(Well-educated career
              professionals that have prospered through the Great
              Recession. To maintain their upscale suburban lifestyles,
              these goal oriented couples work, often commuting far
              and working long hours. However, their schedules are
              fi ne-tuned to meet the needs of their school age children.
              They are fi nancially savvy; they invest wisely and benefi t
              from interest and dividend income. So far, these established
              families have accumulated an average of 1.5 million dollars
              in net worth, and their annual household income runs at
              more than twice the US level. They take pride in their newer
              homes and spend valuable time and energy upgrading.
              Their homes are furnished with the latest in home trends,
              including fi nished basements equipped with home gyms
              and in-home theaters.),
    3.0 => ~s(Young professionals with families that have opted
              to trade up to the newest housing in the suburbs. The
              original Boomburbs neighborhoods began growing in the
              1990s and continued through the peak of the housing boom.
              Most of those neighborhoods are fully developed now.
              This is an affl uent market but with a higher proportion of
              mortgages. Rapid growth still distinguishes the Boomburbs
              neighborhoods, although the boom is more subdued now
              than it was 10 years ago. So is the housing market. Residents
              are well-educated professionals with a running start
              on prosperity.),
    4.0 => ~s(Well educated, well read,
              and well capitalized. Families include empty nesters and
              empty nester wannabes, who still have adult children
              at home. Located in older neighborhoods outside the
              urban core, their suburban lifestyle includes home
              remodeling and gardening plus the active pursuit of
              sports and exercise. They enjoy good food and wine,
              plus the amenities of the city’s cultural events.),
    5.0 => ~s(Residents are now approaching
              retirement but showing few signs of slowing down. They
              are active in their communities, generous in their donations,
              and seasoned travelers. They take advantage of
              their proximity to large metropolitan centers to support
              the arts, but prefer a more expansive home style in less
              crowded neighborhoods. They have cultivated a
              lifestyle that is both affl uent and urbane.),
    6.0 => ~s(Professionals that live a
              sophisticated, exclusive lifestyle. Half of all households
              are occupied by married-couple families and about
              30% are singles. These are busy, well-connected, and
              well-educated consumers—avid readers and moviegoers,
              environmentally active, and fi nancially stable. This market
              is a bit older, with a median age of almost 43 years,
              and growing slowly, but steadily.),
    7.0 => ~s(Slightly older couples move less than any
              other market. Many couples have already transitioned to
              empty nesters; many are still home to adult children. Families
              own older, single-family homes and maintain their standard
              of living with dual incomes. These consumers have higher
              incomes and home values and much higher net worth. 
              Older homes require upkeep; home improvement
              and remodeling projects are a priority—preferably done by
              contractors. Residents spend their spare time participating
              in a variety of sports or watching movies. They shop online
              and in a variety of stores, from upscale to discount, and use
              the Internet largely for fi nancial purposes.),
    8.0 => ~s(Highest percentage of Asian and multiracial populations, many of them born
              outside the US. This is a family market, distinguished by
              married-couple families, with and without children, some in
              multigenerational households. They own their homes, mainly
              high-priced single-family homes, with a higher proportion of
              town houses. Workers are generally employed in white collar
              occupations such as business, computer, architecture, and
              engineering roles. Median household income and net worth
              are much higher than the US. These trendy residents buy nice
              food and clothing, as well as the latest gadgets. They keep up
              with family overseas with frequent phone calls and foreign travel.),
    9.0 => ~s(Residents are well educated and
              climbing the ladder in STEM (science, technology, engineering,
              and mathematics\) occupations. They change jobs often and
              therefore choose to live in condos, town homes, or apartments;
              many still rent their homes. The market is fast-growing,
              located in lower density neighborhoods of large metro areas.
              Enterprising Professionals residents are diverse, with Asians
              making up over one-fi fth of the population. This young
              market makes over one and a half times more income than
              the US median, supplementing their income with high-risk
              investments. At home, they enjoy the Internet and TV on
              high-speed connections with premier channels and services.),
    10.0 => ~s(Predominantly single, well-educated 
              professionals in business, finance, legal,
              computer, and entertainment occupations. They are
              affl uent and partial to city living—and its amenities.
              Neighborhoods are densely populated, primarily located
              in the cities of large metropolitan areas. Many residents
              walk, bike, or use public transportation to get to work; a
              number work from home. Although single householders
              technically outnumber couples, this market includes a higher
              proportion of partner households, including the highest
              proportion of same-sex couples. Residents are more interested
              in the stock market than the housing market. Cosmopolitan and 
              connected—technologically savvy consumers. They are active and
              health conscious, and care about the environment.),
    11.0 => ~s(Residents in this highly mobile and educated market live
              alone or with a roommate in older apartment buildings and
              condos located in the urban core of the city. This is one of
              the fastest growing segments; the popularity of urban life
              continues to increase for consumers in their late twenties
              and thirties. Income is close to the US average, 
              but they spend a large portion of their wages
              on rent, clothes, and the latest technology. Computers and
              cell phones are an integral part of everyday life and are
              used interchangeably for news, entertainment, shopping,
              and social media. Metro Renters residents live close to their
              jobs and usually walk or take a taxi to get around the city.),
    12.0 => ~s(These educated young singles aren’t ready to settle down; they
                do not own homes or vehicles and choose to spend their
                disposable income on upscale city living and entertainment.
                Dressed head to toe in the most current fashions, their
                weeknights and weekends are fi lled discovering local art
                and culture, dining out, or exploring new hobbies. Their
                vacations are often spontaneous, packed with new experiences
                and chronicled on their Facebook pages.),
    13.0 => ~s(Affluent, family-oriented market with a 
                country flavor. Residents are partial to new housing
                away from the bustle of the city but close enough to
                commute to professional job centers. Life in this suburban
                wilderness offsets the hectic pace of two working parents
                with growing children. They favor time-saving devices,
                like banking online or housekeeping services, and
                family-oriented pursuits.),
    14.0 => ~s(Residences are single-family homes that are owner
                occupied, with only one-fi fth of the households occupied
                by renters. Education and diversity levels are similar to
                the US as a whole. These families spend a lot of time on
                the go and therefore tend to eat out regularly. When at
                home, weekends are consumed with home improvement
                and remodeling projects.),
    15.0 => ~s( Residents are conservative, 
                family-oriented consumers. Still more
                country than rock and roll, they are thrifty but willing to
                carry some debt and are already investing in their futures.
                They rely on their smartphones and mobile devices to stay
                in touch and pride themselves on their expertise. They
                prefer to buy American and travel in the US. This market
                is younger but growing in size and assets.),
    16.0 => ~s(Residents in this large, growing segment are older, with
                more than half of all householders aged 55 or older;
                many still live in the suburbs where they grew up. Most
                are professionals working in government, health care,
                or manufacturing. These Baby Boomers are earning a
                comfortable living and benefi tting from years of prudent
                investing and saving. Their net worth is well above
                average. Many are enjoying the transition
                from child rearing to retirement. They value their health
                and fi nancial well-being.),
    17.0 => ~s(These residents embrace an urbane lifestyle that includes
                support of the arts, travel, and extensive reading. They are
                connected and make full use of the advantages of mobile
                devices. Professional couples or single households without
                children, they have the time to focus on their homes and
                their interests. The population is slightly older and already
                planning for their retirement.),
    18.0 => ~s(These practical suburbanites have achieved the dream of
              home ownership. They have purchased homes that are
              within their means. Their homes are older, and town homes
              and duplexes are not uncommon. Many of these families
              are two-income married couples approaching retirement
              age; they are comfortable in their jobs and their homes,
              budget wisely, but do not plan on retiring anytime soon
              or moving. Neighborhoods are well established, as are
              the amenities and programs that supported their now
              independent children through school and college. The
              appeal of these kid-friendly neighborhoods is now
              attracting a new generation of young couples.),
    19.0 => ~s(Residents are a mix of married-couple families
              and singles living in older developments of
              single-family homes. While varied, the work
              force is primarily white collar, with a higher
              concentration of skilled workers in manufacturing,
              retail trade, and health care. A large market of stable, hard-working
              consumers with modest incomes but above
              average net worth. Family oriented,
              they value time spent at home. Most have lived,
              worked, and played in the same area for years.),
    20.0 => ~s(Seniors, at or approaching
              retirement, with below average labor force participation and
              above average net worth. Although located in predominantly
              metropolitan areas, they live outside the central cities, in
              smaller communities. Their lifestyle is more country than
              urban. They are generous, but not spendthrifts.),
    21.0 => ~s(Country living and self-reliance, residents are 
              avid do-it-yourselfers, maintaining and remodeling 
              their homes, with all the necessary power tools to 
              accomplish the jobs. Gardening, especially growing 
              vegetables, is also a priority, again with the right 
              tools, tillers, tractors, and riding mowers. Outdoor 
              living also features a variety of sports: hunting and 
              fishing, motorcycling, hiking and camping, and even golf. 
              Self-described conservatives, residents of Green Acres 
              remain pessimistic about the near future yet are heavily 
              invested in it.),
    22.0 => ~s(Residents are entrenched in their traditional,
              rural lifestyles. Citizens here are older, and many have
              grown children that have moved away. They still cherish
              family time and also tending to their vegetable gardens
              and preparing homemade meals. Residents embrace the
              outdoors; they spend most of their free time preparing for
              their next fi shing, boating, or camping trip. The majority has
              at least a high school diploma or some college education;
              many have expanded their skill set during their years of
              employment in the manufacturing and related industries. They
              may be experts with DIY projects, but the latest technology
              is not their forte. They use it when absolutely necessary,
              but seek face-to-face contact in their routine activities.),
    23.0 => ~s(These neighborhoods are found in pastoral settings
              throughout the United States. Consumers are educated
              empty nesters living an active but modest lifestyle. Their
              focus is land. They are more likely to invest in real estate
              or a vacation home than stocks. They are active gardeners
              and partial to homegrown and home-cooked meals.
              Although retirement beckons, most of these residents still
              work, with incomes slightly above the US level.),
    24.0 => ~s(A predominance of self-employed
              farmers. These agricultural communities are not diverse,
              dominated by married-couple families that own single-family
              dwellings and many vehicles. Median household income is
              similar to the US, and labor force participation is slightly
              higher. Faith is important to this hardworking market. When
              they find time to relax, they favor outdoor activities.),
    25.0 => ~s(Retirement looms for many of these blue collar, older
              householders, but workers are postponing retirement or
              returning to work to maintain their current lifestyles.
              Workers are traveling further to maintain employment.
              They are passionate about their hobbies, like freshwater
              fishing and hunting, but otherwise have very simple tastes.),
    26.0 => ~s(These older householders are
              primarily homeowners, and many have paid off their
              mortgages. Their children have moved away, but they have
              no plans to leave their homes. Their hearts are with the
              country; they embrace the slower pace of life here but
              actively participate in outdoor activities and community
              events. Traditional and patriotic, these residents support
              their local businesses, always buy American, and favor
              domestic driving vacations over foreign plane trips.),
    27.0 => ~s(Residents are younger and more mobile and ethnically diverse than
              the previous generation. They are ambitious, working hard
              to get ahead, and willing to take some risks to achieve their
              goals. The recession has impacted their fi nancial well-being,
              but they are optimistic. Their homes are new; their families
              are young. And this is one of the fastest-growing markets
              in the country.),
    28.0 => ~s(Residents are multicultural, multigenerational,
              and multilingual. Trendy and fashion conscious, they are risk
              takers. However, these consumers focus on their children
              and maintain gardens. They are well connected with their
              smartphones, but more likely to shop in person or via the
              Home Shopping Network. Their favorite stores are as
              diverse as they are, Costco or Whole Foods, Target
              or Nordstrom.),
    29.0 => ~s(The majority of households
              include younger married-couple families with children and,
              frequently, grandparents. Diversity is high; many residents
              are foreign born, of Hispanic origin. Hard work and sacrifi ce
              have improved their economic circumstance as they pursue
              a better life for themselves and their family. Spending is
              focused more on the members of the household than the
              home. Entertainment includes multiple televisions, movie
              rentals, and video games at home or visits to theme parks
              and zoos. This market is connected and adept at accessing
              what they want from the Internet.),
    30.0 => ~s(Family is central within these diverse communities.
              Hispanics make up more than 70% of the residents.
              More than one in four are foreign born, bringing rich
              cultural traditions to these neighborhoods in the urban
              outskirts. Dominating this market are younger families
              with children or single-parent households with multiple
              generations living under the same roof. These households
              balance their budgets carefully but also indulge in the
              latest trends and purchase with an eye to brands. Most
              workers are employed in skilled positions across the
              manufacturing, construction, or retail trade sectors.),
    31.0 => ~s(These neighborhoods are home to young,
              Hispanic families with children and, frequently, multiple
              generations living in single-family homes. Most residents
              are Hispanic (mostly of Mexican origin\). A third is foreign
              born; 30% of households are linguistically isolated. This
              market is all about spending time with family, taking care
              of family and home, and following the Hispanic heritage.
              More homes are rented than owned, located in semirural
              areas where agriculture dominates. Unemployment is
              high, and household income is much lower than the US,
              supplemented by self-employment, home-grown products,
              and some public assistance. Consumers favor Spanish
              language media and outdoor activities. ),
    32.0 => ~s(Children are the center of households that are composed
              mainly of married couples with children and single-parent
              families. Grandparents are caregivers in some of these
              households. Recent arrivals and older generations are
              language-isolated. Much of the working-age population is
              employed in blue-collar occupations, specializing in skilled
              work, as well as building maintenance and service jobs.
              Spending is focused on the family and at-home entertainment,
              but they do like to gamble (casinos and lottery tickets\).),
    33.0 => ~s(The wide-ranging demographic
              characteristics of residents mirror their passion for social
              welfare and equal opportunity. Household types range
              from single person to married-couple families, with and
              without children. A blend of owners and renters, singlefamily
              homes and town homes, midrise and high-rise
              apartments, these neighborhoods are both racially and
              ethnically diverse. Many residents have completed some
              college or a degree, and they earn a good income in
              professional and service occupations. Willing to commute
              to their jobs, they work hard and budget well to support
              their urban lifestyles, laying the foundation for stable
              financial futures.),
    34.0 => ~s( Young and mobile,
              they are more likely to rent. Well educated and well
              employed, half have a college degree and a professional
              occupation. Incomes close to the US median come
              primarily from wages and self-employment. This group is
              highly connected, using the Internet for entertainment
              and making environmentally friendly purchases. Long
              hours on the Internet are balanced with time at the gym.
              Many embrace the “foodie” culture and enjoy cooking
              adventurous meals using local and organic foods. Music
              and art are major sources of enjoyment. They travel
              frequently, both personally and for business.),
    35.0 => ~s(These communities are home to young, educated, working
              professionals. One out of three householders is under
              the age of 35. Slightly more diverse couples dominate
              this market, with more renters than homeowners. More
              than two-fi fths of the households live in single-family
              homes; over a third live in 5+ unit buildings. Labor force
              participation is high, generally white-collar work, with a
              mix of food service and part-time jobs (among the college
              students\). Median household income, median home value,
              and average rent are close to the US values. Residents
              of this segment are physically active and up on the
              latest technology),
    36.0 => ~s( A mix of races and ethnicities, with strong
              concentrations of Asians, particularly Chinese (highest
              concentration of any segment\) reside here. Close to half of
              the residents are foreign born, and 30% of households have
              members who do not speak English. These neighborhoods
              are dominated by married-couple families who live in rented
              apartments. Residents are employed in professional, service
              (especially food and personal service\), sales, and administrative
              occupations; many work outside the county where they
              live. Unemployment is higher; median household income
              and net worth are below average, although the home
              values in these neighborhoods are high.),
    37.0 => ~s(This group is also more diverse than the US. Half of householders
              are renters, and many of the homes are older town
              homes or duplexes. Friends and family are central to Front
              Porches residents and help to infl uence household buying
              decisions. Residents enjoy their automobiles and like cars
              that are fun to drive. Income and net worth are well below
              the US average, and many families have taken out loans to
              make ends meet. ),
    38.0 => ~s(Neighborhoods in transition, populated by renters who are
              just beginning their careers or retiring. Some are still in
              college; some are taking adult education classes. They
              support environmental causes and Starbucks. Age is not
              always obvious from their choices.),
    39.0 => ~s(This slightly smaller market is
              primarily a family market, married couples (with and
              without children\) and single parents. Younger, highly
              diverse (with higher proportions of black, multiracial, and
              Hispanic populations\), and less educated, they work
              mainly in service, manufacturing, and retail trade
              industries. Unemployment is high (almost twice the US
              rate\), and median household income is half the US median.
              Almost 1 in 3 households have income below the poverty
              level. Approximately 60% of householders are renters,
              living primarily in single-family homes, with a higher
              proportion of dwellings in 2–4 unit buildings. This
              market is struggling to get by.),
    40.0 => ~s(This is the most affl uent senior
              market and is still growing. The affl uence of Silver and Gold
              has afforded the opportunity to retire to sunnier climates
              that feature exclusive communities and vacation homes.
              These consumers have the free time, stamina, and
              resources to enjoy the good life.),
    41.0 => ~s(This market is
              primarily singles living alone or empty nesters.
              Those still active in the labor force are employed
              in professional occupations; however, these
              consumers are actively pursuing a variety of
              leisure interests—travel, sports, dining out,
              museums, and concerts. They are involved,
              focused on physical fitness, and enjoying their
              lives. This market is smaller, but growing,
              and financially secure.),
    42.0 => ~s(Residents favor communities designed for senior or assisted
              living, primarily in warmer climates with seasonal
              populations. Most of these householders are
              homeowners, although their housing varies from
              mobile homes to single-family residences to
              high-rise apartments. These seniors are informed,
              independent, and involved.),
    43.0 => ~s(These areas are highly seasonal, yet owner occupied. Many homes
              began as seasonal getaways and now serve as primary
              residences. Forty percent are mobile homes; half are
              single-family dwellings. About half are in unincorporated
              and more rural areas. Over a quarter of the population are
              65–74 years old. Most are white and fairly conservative in
              their political and religious views. Residents enjoy watching
              TV, going on cruises, playing Bingo, golfi ng, boating, and
              fi shing. They are very conscious of their health and buy
              specialty foods and dietary supplements.),
    44.0 => ~s(They combine single-family
              homes and independent living with apartments, assisted
              living, and continuous care nursing facilities. Over half of
              the housing units are in multiunit structures, and the
              majority of residents have a lease. This group enjoys
              watching cable TV and stays up-to-date with newspapers
              and magazines. Residents take pride in fi scal responsibility
              and keep a close eye on their fi nances. Although income
              and net worth are well below national averages, residents
              enjoy going to the theater, golfi ng, and taking vacations.
              While some residents enjoy cooking, many have paid their
              dues in the kitchen and would rather dine out.),
    45.0 => ~s( Over one-third of householders
              here are aged 65 or older and dependent on low, fi xed
              incomes, primarily Social Security. In the aftermath of the
              Great Recession, early retirement is now a dream for many
              approaching the retirement age; wages and salary income in
              this market are still earned. Residents live alone in low-rent,
              high-rise buildings, located in or close to business districts
              that attract heavy daytime traffi c. But they enjoy the hustle
              and bustle of life in the heart of the city, with the added
              benefi t of access to hospitals, community centers, and
              public transportation. ),
    46.0 => ~s( This market is typically nondiverse,
              slightly older, settled married-couple families, who
              own their homes. Almost two-thirds of the homes are
              single-family structures; a third are mobile homes.
              Median household income and home value are below
              average. Workers are employed in a variety of industries,
              such as manufacturing, health care, retail trade, and
              construction, with higher proportions in mining and
              agriculture than the US. Residents enjoy country living,
              preferring outdoor activities and DIY home projects.),
    47.0 => ~s(Residents live in many of the heavily forested regions of the country.
              Nearly 9 of 10 residents are non-Hispanic whites. This
              group enjoys time spent outdoors, hunting, fi shing, or
              working in their gardens. Indoors, they enjoy watching
              television with a spouse and spending time with their pets.
              When shopping, they look for American-made and generic
              products. These communities are heavily infl uenced by
              religious faith, traditional gender roles, and family history. ),
    48.0 => ~s(Married-couple families reside in over half of the
              households, and over a quarter of householders live in
              mobile homes. This socially conservative group earns a
              living working with their hands. In addition to mining,
              construction and agriculture are common industries for
              employment. They take pride in the appearance of their
              homes and their vehicles. Budget-minded residents enjoy
              home cooking, but nothing too fancy. This is a gregarious
              group that values time spent with friends. ),
    49.0 => ~s(Almost half of householders live in mobile homes;
              approximately two-fifths live in single-family homes. These
              are younger, diverse communities, with the highest
              proportion of American Indians of any segment. These
              family-oriented consumers value their traditions. Workers
              are in service, retail trade, manufacturing, and construction
              industries, with higher proportions in agriculture and
              mining, compared to the US. This market has higher
              unemployment, much lower median household income
              and home value, and a fi fth of households with income
              below poverty level. ),
    50.0 => ~s(These families live within small towns along
              country back roads and enjoy the open air in these sparsely
              populated neighborhoods. Their country lifestyle focuses on
              the outdoors, gardening, hunting, and fi shing. They are
              more likely to own a satellite dish than a home computer.
              Although a majority of households do have a connection
              to the Internet, their use is very limited. Those who are not
              yet retired work in blue collar jobs in the agriculture or
              manufacturing industries.),
    51.0 => ~s(These high density city neighborhoods are characterized
              by a relatively young foreign-born population who have
              embraced the American lifestyle, yet retained their cultural
              integrity. To support their lifestyle, residents
              commute long distances to fi nd work in the service or retail
              industry. Their hard-earned wages and salary income goes
              toward relatively high rents in older multiunit buildings, but
              they’ve chosen these neighborhoods to maintain ties to
              their culture. Single parents are often the recipients of
              Supplemental Security Income and public assistance, but
              their close-knit community provides the invaluable support
              needed while they work. Consumers are bold in
              their purchasing decisions; they seek out deals on branded
              clothing, sometimes indulge in restaurants and personal
              services, and splurge on their cable TV package.),
    52.0 => ~s(Well-educated young workers, some
              of whom are still completing their education, are employed
              in professional/technical occupations, as well as sales and
              offi ce/administrative support roles. These residents are not
              established yet, but striving to get ahead and improve
              themselves. This market ranks in the top 5 for renters,
              movers, college enrollment, and labor force participation
              rate. Almost 1 in 5 residents move each year. Close to half
              of all householders are under the age of 35, the majority
              living alone or in shared nonfamily dwellings. Median
              household income is still below the US. Smartphones are a
              way of life, and they use the Internet extensively.),
    53.0 => ~s( Many residents do not speak 
              English fluently and have moved into
              their homes recently. They are highly mobile and over
              three quarters of households are occupied by renters.
              Many households have young children; a quarter are
              single-parent families. The majority of residents live
              in midsize apartment buildings. Metro Fusion is a
              hard-working market with residents that are dedicated
              to climbing the ladders of their professional and social
              lives. This is particularly diffi cult for the single parents
              due to median incomes that are 35% lower than the
              US level.),
    54.0 => ~s(These apartments are often nestled into neighborhoods with other businesses
              or single-family housing. Nearly one in three residents is
              20 to 34 years old, and over half of the homes are nonfamily
              households. Although many residents live alone, they
              preserve close connections with their family. Income levels
              are low; many work in food service while they are attending
              college. This group is always looking for a deal. They are
              very conscious of their image and seek to bolster their
              status with the latest fashion. Residents are
              tapped into popular music and the local music scene. ),
    55.0 => ~s(Primarily comprised of single-parent and
              single-person households living within large, metro cities.
              While more than a third have a college degree or spent
              some time in college, nearly a third have not fi nished
              high school, which has a profound effect on their
              economic circumstance. However, that has not
              dampened their aspiration to strive for the best for
              themselves and their children.),
    56.0 => ~s(Family and faith are the cornerstones of life in these
              communities. Older children, still living at home, working
              toward fi nancial independence, are common within these
              households. Neighborhoods are stable: little household
              growth has occurred for more than a decade. Many
              residents work in the health care industry or public
              administration across all levels of government. Style is
              important to these consumers, who spend on clothing for
              themselves and their children, as well as on smartphones. ),
    57.0 => ~s(The households are a mix of 
              married-couple families and singles. Many
              families encompass two generations who have lived and
              worked in the community; their children are likely to follow
              suit. The manufacturing, retail trade, and health care
              sectors are the primary sources of employment for these
              residents. This is a younger market—beginning householders
              who are juggling the responsibilities of living on their own
              or a new marriage, while retaining their youthful interests
              in style and fun.),
    58.0 => ~s(The lifestyle is down-to-earth
              and semirural, with television for entertainment
              and news, and emphasis on convenience for
              both young parents and senior citizens. Residents
              embark on pursuits including online computer
              games, scrapbooking, and rural activities like
              hunting and fishing. Since almost 1 in 4
              households is below poverty level, residents
              also keep their fi nances simple—paying bills
              in person and avoiding debt),
    59.0 => ~s(Families in this urban segment may be nontraditional;
              however, their religious faith and family values guide their
              modest lifestyles. Many residents are primary caregivers to
              their elderly family members. Jobs are not always easy to
              come by, but wages and salary income are still the main
              sources of income for most households. Reliance on Social
              Security and public assistance income is necessary to
              support single-parent and multigenerational families.
              High poverty rates in this market make it diffi cult to make
              ends meet. Nonetheless, rents are relatively low,
              public transportation is available, and Medicaid can
              assist families in need.),
    60.0 => ~s(Young, Hispanic families renting apartments
              in older buildings dominate this market; about two-fi fths of households
              have children. Over one-fi fth of households have no vehicle, typically
              those living in the city. Workers are mainly employed in white collar and
              service occupations (especially food service and building maintenance\).
              One-fi fth of workers commute using public transportation and more
              walk or bike to work than expected. Median household income is
              lower, but home values are higher, refl ecting the metropolitan areas in
              which they live. Consumers are attentive to personal style; purchases
              refl ect their youth and their children. True to their culture, residents
              visit Spanish language websites, watch programs on Spanish TV
              networks, and listen to Hispanic music.),
    61.0 => ~s(Their spending refl ects their children—baby food and
              furniture or children’s apparel—and convenience—fast
              food and family restaurants. Consumer choices also focus
              on personal style, as well as the latest trends and fashions.
              Although young and predominantly renters, this market
              is stable, affected more by immigration from abroad
              than local moves.),
    62.0 => ~s(For this young Hispanic market, life has taken many turns
              recently. They are new to America and new to their careers,
              with new, young families. Many are new to the English
              language; more than one-third of households are
              linguistically isolated. Residents are ambitious
              and dream of a better life. They aren’t ready to fully adopt
              the American way of life but are willing to take risks for
              the benefi t of their families. As the breadwinners, the men
              of the house work long hours in blue collar jobs, primarily
              in the service industry. Skilled workers steer toward
              construction and manufacturing sectors. Female labor
              force participation is low, perhaps due to the language
              barrier, but also because of their parenting responsibilities.)
  }

  def get_demographics_for_property(property_id) do
    demographics = __MODULE__
    |> where([d], d.property_id == ^property_id)
    |> Repo.all
    |> Enum.map(fn(demographic) ->
      {demographic.esri_variable, demographic.value}
    end)
    |> Enum.into(%{})
    |> get_demographic_breakdowns_from_demographics
  end

  def get_demographics_for_property_preloaded(demographics) do
    try do
      demographics
      |> Enum.map(fn(demographic) ->
        {demographic.esri_variable, demographic.value}
      end)
      |> Enum.into(%{})
      |> get_demographic_breakdowns_from_demographics
    rescue
      Protocol.UndefinedError ->
        %{
          income: nil,
          ethnic: nil,
          gender: nil,
          tapestry: nil,
          marital_status: nil,
          age: nil
        }
    end
  end

  def get_demographic_breakdowns_from_demographics(demographics) do
    %{
      income: get_income_data(demographics),
      ethnic: get_ethnic_data(demographics),
      gender: get_gender_data(demographics),
      tapestry: get_tapestry_segment(demographics),
      marital_status: get_marital_status_data(demographics),
      age: get_age_data(demographics)
    }
  end

  defp extract_demographic(demographics, demographic) do
    case Map.get(demographics, demographic) do
      nil ->
        0
      value ->
        value
    end
  end

  defp get_gender_data(demographics) do
    sum = extract_demographic(demographics, "MALES_CY") + extract_demographic(demographics, "FEMALES_CY")

    case sum do
      0 ->
        nil
      _ ->
        %{
          male: extract_demographic(demographics, "MALES_CY"),
          female: extract_demographic(demographics, "FEMALES_CY")
        }
    end
  end

  defp get_income_data(demographics) do
    sum = extract_demographic(demographics, "HINC0_CY") + extract_demographic(demographics, "HINC15_CY") + 
          extract_demographic(demographics, "HINC25_CY") + extract_demographic(demographics, "HINC35_CY") + 
          extract_demographic(demographics, "HINC50_CY") + extract_demographic(demographics, "HINC75_CY") + 
          extract_demographic(demographics, "HINC100_CY") + extract_demographic(demographics, "HINC150_CY") + 
          extract_demographic(demographics, "HINC200_CY")

    case sum do
      0 ->
        nil
      _ ->
        %{
          income_0_35K: extract_demographic(demographics, "HINC0_CY") + extract_demographic(demographics, "HINC15_CY") +
                        extract_demographic(demographics, "HINC25_CY"),
          income_35_75K: extract_demographic(demographics, "HINC35_CY") + extract_demographic(demographics, "HINC50_CY"),
          income_75_100K: extract_demographic(demographics, "HINC75_CY"),
          income_100_150K: extract_demographic(demographics, "HINC100_CY"),
          income_150_plus: extract_demographic(demographics, "HINC150_CY") + extract_demographic(demographics, "HINC200_CY"),
          income_average: extract_demographic(demographics, "AVGHINC_CY")
        }
    end
  end

  defp get_ethnic_data(demographics) do
    sum = extract_demographic(demographics, "NHSPWHT_CY") + extract_demographic(demographics, "NHSPBLK_CY") + 
          extract_demographic(demographics, "NHSPAI_CY") + extract_demographic(demographics, "NHSPASN_CY") + 
          extract_demographic(demographics, "NHSPPI_CY") + extract_demographic(demographics, "NHSPOTH_CY") + 
          extract_demographic(demographics, "NHSPMLT_CY") + extract_demographic(demographics, "HISPPOP_CY")

    case sum do
      0 ->
        nil
      _ ->
        %{
          caucasian: extract_demographic(demographics, "NHSPWHT_CY"),
          african_american: extract_demographic(demographics, "NHSPBLK_CY"),
          asian: extract_demographic(demographics, "NHSPASN_CY"),
          hispanic: extract_demographic(demographics, "HISPPOP_CY"),
          other: extract_demographic(demographics, "NHSPAI_CY") + extract_demographic(demographics, "NHSPPI_CY") + extract_demographic(demographics, "NHSPOTH_CY") + extract_demographic(demographics, "NHSPMLT_CY"),
        }
    end
  end

  defp get_tapestry_segment(demographics) do
    Map.get(@tapestrySegments, extract_demographic(demographics, "TSEGNUM"))
  end

  defp get_marital_status_data(demographics) do
    sum = extract_demographic(demographics, "MARRIED_CY") +
          extract_demographic(demographics, "NEVMARR_CY") +
          extract_demographic(demographics, "WIDOWED_CY") +
          extract_demographic(demographics, "DIVORCD_CY")

    case sum do
      0 ->
        nil
      _ ->
        %{married: extract_demographic(demographics, "MARRIED_CY"),
          unmarried: extract_demographic(demographics, "NEVMARR_CY") + extract_demographic(demographics, "WIDOWED_CY") +
                     extract_demographic(demographics, "DIVORCD_CY")} 
    end
  end

  defp get_age_data(demographics) do
    sum = extract_demographic(demographics, "POP0_CY") +
          extract_demographic(demographics, "POP5_CY") +
          extract_demographic(demographics, "POP10_CY") +
          extract_demographic(demographics, "POP15_CY") +
          extract_demographic(demographics, "POP20_CY") +
          extract_demographic(demographics, "POP25_CY") +
          extract_demographic(demographics, "POP30_CY") +
          extract_demographic(demographics, "POP35_CY") + 
          extract_demographic(demographics, "POP40_CY") +
          extract_demographic(demographics, "POP45_CY") +
          extract_demographic(demographics, "POP50_CY") +
          extract_demographic(demographics, "POP55_CY") +
          extract_demographic(demographics, "POP60_CY") +
          extract_demographic(demographics, "POP65_CY") +
          extract_demographic(demographics, "POP70_CY") +
          extract_demographic(demographics, "POP75_CY") +
          extract_demographic(demographics, "POP80_CY") +
          extract_demographic(demographics, "POP85_CY")

    case sum do
      0 ->
        nil
      _ ->
        %{zero_to_fifteen: extract_demographic(demographics, "POP0_CY") +
                           extract_demographic(demographics, "POP5_CY") +
                           extract_demographic(demographics, "POP10_CY"),
          fifteen_to_twenty: extract_demographic(demographics, "POP15_CY"),
          twenty_to_thirty: extract_demographic(demographics, "POP20_CY") +
                            extract_demographic(demographics, "POP25_CY"),
          thirty_to_fifty: extract_demographic(demographics, "POP30_CY") +
                           extract_demographic(demographics, "POP35_CY") + 
                           extract_demographic(demographics, "POP40_CY") +
                           extract_demographic(demographics, "POP45_CY"),
          fifty_plus: extract_demographic(demographics, "POP50_CY") +
                      extract_demographic(demographics, "POP55_CY") + 
                      extract_demographic(demographics, "POP60_CY") +
                      extract_demographic(demographics, "POP65_CY") +
                      extract_demographic(demographics, "POP70_CY") +
                      extract_demographic(demographics, "POP75_CY") +
                      extract_demographic(demographics, "POP80_CY") +
                      extract_demographic(demographics, "POP85_CY")}
    end
  end

  def insert_esri_data_for_property(property) do
    variables = @variables
    |> Enum.map(fn({_, queryVariable}) ->
      queryVariable
    end)
    |> Enum.join("%22,%22")

    query_url = @esri_url <>
      "token=" <> get_esri_token <>
      "&" <> get_study_area_for_lat_lng(property.lat, property.lng) <>
      @study_area_options <> "&f=pjson&forStorage=true" <>
      "&analysisVariables=[%22" <> variables <> "%22]" 

    case HTTPoison.post(query_url, "", [], [{:timeout, :infinity}, {:recv_timeout, :infinity}]) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        extract_esri_variables(Poison.Parser.parse!(body))
        |> Enum.map(fn({variable, value}) ->
          __MODULE__.changeset(%__MODULE__{}, %{:esri_variable => variable, :distance => 1.0, :value => value, :property_id => property.id})
          |> Repo.insert!
        end)
      _ ->
        {:error, "ERROR Retreiving Esri Attributes"}
    end
  end

  def get_esri_data_for_lat_lng(lat, lng) do
    variables = @variables
    |> Enum.map(fn({_, queryVariable}) ->
      queryVariable
    end)
    |> Enum.join("%22,%22")

    query_url = @esri_url <>
      "token=" <> get_esri_token <>
      "&" <> get_study_area_for_lat_lng(lat, lng) <>
      @study_area_options <> "&f=pjson&forStorage=true" <>
      "&analysisVariables=[%22" <> variables <> "%22]" 

    case HTTPoison.post(query_url, "", [], [{:timeout, :infinity}, {:recv_timeout, :infinity}]) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        extract_esri_variables(Poison.Parser.parse!(body))
        |> Enum.map(fn({variable, value}) ->
          %{"esri_variable" => variable, "distance" => 1.0, "value" => value}
        end)
      _ ->
        {:error, "ERROR Retreiving Esri Attributes"}
    end
  end

  def get_esri_data_for_lat_lng_batch(properties) do
    latLngWithCodes = properties
    |> Enum.with_index
    |> Enum.map(fn({property, index}) ->
      %{"property" => %{"lat" => lat, "lng" => lng}} = property

      {"point#{(index + 1)}", {lat, lng}}
    end)

    propertyMap = properties
    |> Enum.map(fn(property) ->
      %{"property" => %{"lat" => lat, "lng" => lng}} = property

      {{lat, lng}, property}
    end)
    |> Enum.into(%{})

    studyAreas = latLngWithCodes
    |> Enum.map(fn({code, {lat, lng}}) ->
      "{%22geometry%22:{%22x%22:#{lng},%22y%22:#{lat}},%22attributes%22:{%22#{@idCode}%22:%22#{code}%22}}"
    end)
    |> Enum.join(",")

    latLngWithCodes = latLngWithCodes
    |> Enum.into(%{})

    variables = @variables
    |> Enum.map(fn({_, queryVariable}) ->
      queryVariable
    end)
    |> Enum.join("%22,%22")

    query_url = "#{@esri_url}&token=#{get_esri_token}&studyAreas=[#{studyAreas}]&#{@study_area_options}"
      <> "&f=pjson&forStorage=true&analysisVariables=[%22#{variables}%22]"

    case HTTPoison.post(query_url, "", [], [{:timeout, :infinity}, {:recv_timeout, :infinity}]) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->

        %{"results" => [%{"value" => %{"FeatureSet" => [%{"features" => results}]}}]} = Poison.Parser.parse!(body)

        results
        |> Enum.map(fn(attributes) ->
          variableTuples = extract_esri_variables_batch(attributes)

          %{"attributes" => %{"myId" => latLngCode}} = attributes

          {lat, lng} = Map.get(latLngWithCodes, latLngCode)
          property = Map.get(propertyMap, {lat, lng})

          {property, variableTuples}
        end)
        |> Enum.map(fn({property, variableTuples}) ->
          demographics = variableTuples
          |> Enum.map(fn({variable, value}) ->
            %{"distance" => 1.0, "value" => value, "esri_variable" => variable}
          end)

          Map.merge(property, %{"demographics" => demographics})
        end)
      _ ->
        nil
    end
  end

  def extract_esri_variables_batch(attributes) do
    @variables
    |> Enum.map(fn({variable, _}) -> 
      %{"attributes" => %{^variable => value}} = attributes
      {variable, value}
    end)
  end

  def get_esri_data_for_lat_lng_rs_batch(properties) do
    latLngWithCodes = properties
    |> Enum.with_index
    |> Enum.map(fn({property, index}) ->
      %{"property" => %{"lat" => lat, "lng" => lng}} = property

      {"point#{(index + 1)}", {lat, lng}}
    end)

    propertyMap = properties
    |> Enum.map(fn(property) ->
      %{"property" => %{"lat" => lat, "lng" => lng}} = property

      {{lat, lng}, property}
    end)
    |> Enum.into(%{})

    studyAreas = latLngWithCodes
    |> Enum.map(fn({code, {lat, lng}}) ->
      "{%22geometry%22:{%22x%22:#{lng},%22y%22:#{lat}},%22attributes%22:{%22#{@idCode}%22:%22#{code}%22}}"
    end)
    |> Enum.join(",")

    latLngWithCodes = latLngWithCodes
    |> Enum.into(%{})

    variables = @rs_variables
    |> Enum.map(fn({returnVariable, queryVariable}) ->
      queryVariable
    end)
    |> Enum.join("%22,%22")

    query_url = "#{@esri_url}&token=#{get_esri_token}&studyAreas=[#{studyAreas}]&#{@rs_study_area_options}"
      <> "&f=pjson&forStorage=true&analysisVariables=[%22#{variables}%22]"

    case HTTPoison.post(query_url, "", [], [{:timeout, :infinity}, {:recv_timeout, :infinity}]) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->

        %{"results" => [%{"value" => %{"FeatureSet" => [%{"features" => results}]}}]} = Poison.Parser.parse!(body)

        results
        |> Enum.map(fn(attributes) ->
          variableTuples = extract_esri_variables_rs_batch(attributes)

          %{"attributes" => %{"myId" => latLngCode}} = attributes

          {lat, lng} = Map.get(latLngWithCodes, latLngCode)
          property = Map.get(propertyMap, {lat, lng})

          {property, variableTuples}
        end)
        |> Enum.map(fn({property, variableTuples}) ->
          add_demographics = variableTuples
          |> Enum.map(fn({variable, value}) ->
            %{"distance" => 0.31, "value" => value, "esri_variable" => variable}
          end)

          old_demographics = Map.get(property, "demographics")

          property = Map.merge(property, %{"demographics" => old_demographics ++ add_demographics})

          [{"X5001_X", clothing}, {"X1131_X", food}, {"X10001_X", personal}, {"X9001_X", entertainment}] = variableTuples
          sum = clothing + food + personal + entertainment

          Map.merge(property, %{"rs_data" => %{"sum" => sum}})
        end)
      _ ->
        nil
    end
  end

  def extract_esri_variables_rs_batch(attributes) do
    @rs_variables
    |> Enum.map(fn({variable, _}) -> 
      %{"attributes" => %{^variable => value}} = attributes
      {variable, value}
    end)
  end

  def get_esri_data_for_lat_lng_rs(lat, lng) do
    variables = @rs_variables
    |> Enum.map(fn({_, queryVariable}) ->
      queryVariable
    end)
    |> Enum.join("%22,%22")

    query_url = @esri_url <>
      "token=" <> get_esri_token <>
      "&" <> get_study_area_for_lat_lng_rs(lat, lng) <>
      @rs_study_area_options <> "&f=pjson&forStorage=true" <>
      "&analysisVariables=[%22" <> variables <> "%22]" 

    case HTTPoison.post(query_url, "", [], [{:timeout, :infinity}, {:recv_timeout, :infinity}]) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        extract_esri_variables_rs(Poison.Parser.parse!(body))
        |> Enum.map(fn({variable, value}) ->
          %{"esri_variable" => variable, "distance" => 0.31, "value" => value}
        end)
      _ ->
        {:error, "ERROR Retreiving Esri Attributes"}
    end
  end

  defp get_study_area_for_lat_lng_rs(lat, lng) do
    @rs_study_areas <> "{%22x%22:" <> "#{lng}" <> ",%22y%22:" <> "#{lat}" <> "}}]"
  end

  defp extract_esri_variables_rs(%{"results" => [%{"value" => %{"FeatureSet" => [%{"features" => [%{"attributes" => esriAttributes}]}]}}]}) do
    @rs_variables
    |> Enum.map(fn({variable, _}) -> 
      {variable, Map.get(esriAttributes, variable)}
    end)
  end

  defp get_study_area_for_lat_lng(lat, lng) do
    @study_areas <> "{%22x%22:" <> "#{lng}" <> ",%22y%22:" <> "#{lat}" <> "}}]"
  end

  defp extract_esri_variables(%{"results" => [%{"value" => %{"FeatureSet" => [%{"features" => [%{"attributes" => esriAttributes}]}]}}]}) do
    @variables
    |> Enum.map(fn({variable, _}) -> 
      {variable, Map.get(esriAttributes, variable)}
    end)
  end

  def get_esri_token do
    token_query = "https://www.arcgis.com/sharing/rest/oauth2/token?f=json&client_id=#{@esri_client_id}&client_secret=#{@esri_client_secret}&grant_type=client_credentials"
  
    case HTTPoison.post(token_query, "") do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        %{"access_token" => token} = Poison.Parser.parse!(body)
        token
      _ ->
        {:error, "ERROR Retreiving Esri Token"}
    end
  end
end
