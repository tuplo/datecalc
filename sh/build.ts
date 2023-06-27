import * as shell from "@tuplo/shell";

async function main() {
	const $ = shell.$({ verbose: true });

	await $`rm -rf dist`;
	await $`rm -rf cjs`;
	await $`tsc --build tsconfig.build.json`;

	await $`esbuild src/index.ts --bundle --platform=node --outfile=dist/index.cjs`;
	await $`esbuild src/index.ts --bundle --format=esm --outfile=dist/index.js`;

	// node12 compatibility
	await $`mkdir cjs`;
	await $`cp dist/index.cjs cjs/index.js`;
}

main();
