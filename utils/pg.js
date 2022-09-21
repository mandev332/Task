import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  connectionString:
    "postgres://mjulwqyi:sOChHRo-IegqlYrSDommypc4z0Kj9wq1@otto.db.elephantsql.com/mjulwqyi",
});

async function fetch(queryString, ...params) {
  const client = await pool.connect();
  try {
    let { rows } = await client.query(
      queryString,
      params.length ? params : null
    );
    return rows;
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
}

export { fetch };
