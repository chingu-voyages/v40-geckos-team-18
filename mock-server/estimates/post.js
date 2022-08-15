module.exports = (req, res) => {
  const { faker } = require('@faker-js/faker');

  let responseBody;
  const fakeCarbonG = faker.datatype.number({ min: 1000000, max: 10000000 });
  const fakeCarbonKg = parseInt((fakeCarbonG / 1000).toFixed(2));

  switch (req.body.type) {
    case 'flight':
      // add in the cabin_class field in each leg if not present
      const newLegs = req.body.legs.map((leg) => {
        if (!leg.cabin_class) return { ...leg, cabin_class: 'economy' };
        return leg;
      });

      responseBody = {
        data: {
          id: faker.datatype.uuid(),
          type: 'estimate',
          attributes: {
            type: req.body.type,
            passengers: req.body.passengers,
            legs: newLegs,
            estimated_at: new Date().toISOString(),
            carbon_g: fakeCarbonG,
            carbon_lb: parseInt((fakeCarbonKg / 2.2).toFixed(2)),
            carbon_kg: fakeCarbonKg,
            carbon_mt: parseInt((fakeCarbonG / 1000000).toFixed(2)),
            distance_unit: req.body.distance_unit ?? 'km', // respond default
            distance_value: req.body.distance_value,
          },
        },
      };

      return res.status(200).send(responseBody);
    case 'electricity':
      responseBody = {
        data: {
          id: faker.datatype.uuid(),
          type: 'estimate',
          attributes: {
            type: req.body.type,
            electricity_unit: req.body.electricity_unit ?? 'mwh', // respond default
            electricity_value: req.body.electricity_value,
            country: req.body.country,
            state: req.body.state ?? 'Not provided',
            estimated_at: new Date().toISOString(),
            carbon_g: fakeCarbonG,
            carbon_lb: parseInt((fakeCarbonKg / 2.2).toFixed(2)),
            carbon_kg: fakeCarbonG / 1000,
            carbon_mt: parseInt((fakeCarbonG / 1000000).toFixed(2)),
          },
        },
      };

      return res.status(200).send(responseBody);
    case 'vehicle':
      if (!req.body.distance_value)
        return res.status(400).send('Missing field: required distance_value');

      responseBody = {
        data: {
          id: faker.datatype.uuid(),
          type: 'estimate',
          attributes: {
            type: req.body.type,
            distance_value: req.body.distance_value,
            distance_unit: req.body.distance_unit ?? 'km', // respond default
            vehicle_make: faker.vehicle.manufacturer(),
            vehicle_model: faker.vehicle.model(),
            vehicle_year: faker.datatype.number({ min: 1970, max: 2023 }),
            estimated_at: new Date().toISOString(),
            carbon_g: fakeCarbonG,
            carbon_lb: parseInt((fakeCarbonKg / 2.2).toFixed(2)),
            carbon_kg: fakeCarbonG / 1000,
            carbon_mt: parseInt((fakeCarbonG / 1000000).toFixed(2)),
          },
        },
      };
      return res.status(200).send(responseBody);
    case 'fuel_combustion':
      if (!req.body.fuel_source_type)
        return res.status(400).send('fuel_source_type field is missing');

      if (!req.body.fuel_source_unit)
        return res.status(400).send('fuel_source_unit field is missing');

      if (!req.body.fuel_source_value)
        return res.status(400).send('fuel_source_value field is missing');

      responseBody = {
        data: {
          id: faker.datatype.uuid(),
          type: 'estimate',
          attributes: {
            type: req.body.type,
            fuel_source_type: req.body.fuel_source_type,
            fuel_source_unit: req.body.fuel_source_unit,
            fuel_source_value: req.body.fuel_source_value,
            estimated_at: new Date().toISOString(),
            carbon_g: fakeCarbonG,
            carbon_lb: parseInt((fakeCarbonKg / 2.2).toFixed(2)),
            carbon_kg: fakeCarbonG / 1000,
            carbon_mt: parseInt((fakeCarbonG / 1000000).toFixed(2)),
          },
        },
      };
      return res.status(200).send(responseBody);
    default:
      return res
        .status(400)
        .send('Invalid type parameter. Check Carbon API docs for this value.');
  }
};
