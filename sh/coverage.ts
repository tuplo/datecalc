import * as shell from "@tuplo/shell";

async function main() {
	const $ = shell.$({ verbose: true });

	await $`rm -rf ./node_modules/.cache`;
	await $`rm -rf coverage/`;
	await $`rm -rf .nyc_output/`;

	await $`nyc --reporter=lcov node --test --experimental-test-coverage --test-reporter spec --loader tsx src/*.test.ts`;
}

main();
