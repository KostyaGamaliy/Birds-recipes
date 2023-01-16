let header = `
	<div class="flex justify-start lg:w-0 lg:flex-1">
		<img
			class="h-8 w-auto sm:h-10"
			src="https://img.icons8.com/ios-filled/512/salt-bae.png"
			alt=""
		/>
	</div>

	<div class="flex items-center justify-center">
		<button
			id="allBirdsBtn"
			class="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 cursor-pointer"
			onclick="card(); closeCreateBird(); openBirdCards()"
		>
			Список птиц
		</button>
	</div>

	<div class="flex items-center justify-center">
		<button
			id="allBirdsBtn"
			class="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 cursor-pointer"
			onclick="sortCardsByStart(); closeCreateBird(); openBirdCards()"
		>
			Сортировка за алфавитом А-Я
		</button>
	</div>

	<div class="flex items-center justify-center">
		<button
			id="allBirdsBtn"
			class="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 cursor-pointer"
			onclick="sortCardsByEnd(); closeCreateBird(); openBirdCards()"
		>
			Сортировка за алфавитом Я-А
		</button>
	</div>

	<div class="flex items-center justify-center">
		<div class="flex items-center">
			<input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" onclick="checkChBox()">
			<label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900">Птицы с рецептами</label>
		</div>
	</div>

	<div class="items-center justify-end flex md:flex-1 lg:w-0">
		<button
			id="createBirdBtn"
			class="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 cursor-pointer"
			onclick="openCreateBird(); closeBirdCards()"
			>Создать птицу</button
		>
	</div>`

let createBirdForm = `
	<lable class="text-xl text-black opacity-70">
		Сслка на картинку:
		<input
			type="text"
			placeholder="Заголовок"
			class="mt-1 mx-0 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-sm outline-none placeholder: text-gray-700"
			id="file1"
		/>
	</lable>

	<div class="flex object-cover py-2 flex items-center justify-center w-full" id="imgSaveField">
		<img id="prevImg" class="w-full" />
	</div>

	<lable class="text-xl text-black opacity-70">
		Именование птицы:
		<input
			type="text"
			placeholder="Заголовок"
			class="mt-1 mb-3 mx-0 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-sm outline-none placeholder: text-gray-700"
			id="birdName"
		/>
	</lable>

	<lable class="text-xl text-black opacity-70">
		Описание:
		<textarea
			placeholder="Опис..."
			class="mt-1 mx-0 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-sm outline-none resize-none h-40 placeholder: text-gray-700"
			id="birdDescription"
		></textarea>
	</lable>

	<div class="flex gap-8 items-center justify-center mt-4">
		<div
			class="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4 hover:bg-green-700"
			onclick="save(); closeCreateBird(); openBirdCards()"
		>
			Создать птицу
		</div>
	</div>`

details = []

let createFormEl = document.getElementById("createForm")
document.getElementById("header").innerHTML = header

if (createFormEl) {
	createFormEl.innerHTML = createBirdForm
}

const options = {
	method: "GET",
	url: "https://tasty.p.rapidapi.com/feeds/list",
	params: { size: "5", timezone: "+0700", vegetarian: "false", from: "0" },
	headers: {
		"X-RapidAPI-Key": "d1fbb82f10msh78689a358e02a4cp19499ajsn0da38ecc5ccd",
		"X-RapidAPI-Host": "tasty.p.rapidapi.com",
	},
}

axios
	.request(options)
	.then(function (response) {
		console.log(response.data)
	})
	.catch(function (error) {
		console.error(error)
	})

function checkChBox() {
	let chbox = document.getElementById("default-checkbox")
	if (chbox.checked) {
		let birdCardWithRecipesForm = ``
		closeBirdCards()
		openBirdWithRecipes()
		for (let i = 0; i < details.length; i++) {
			if (details[i].recipeArray.length != 0) {
				birdCardWithRecipesForm += `
					<div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md bg-gray-100 my-3">
						<img
							class="rounded-t-lg h-[223px] w-[335px]"
							src="${details[i].imageUrl}"
							alt=""
						/>
						<h5
							class="my-2 text-2xl font-bold tracking-tight text-slate-700 hover:text-slate-900 text-ellipsis overflow-hidden"
						>
							${details[i].name}
						</h5>

						<p
							class="mb-3 font-normal text-gray-700 dark:text-gray-400 overflow-y-auto h-32"
						>
							${details[i].description}
						</p>
						
						<a
							class="inline-flex items-center px-3 py-2 w-full text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer"
							onclick="recipeCard(${i})"
						>
							Список рецептов
							<svg
								aria-hidden="true"
								class="w-4 h-4 ml-2 -mr-1"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
									clip-rule="evenodd"
								></path>
							</svg>
						</a>

						<div class="flex flex-row justify-between mt-3">
							<button
								class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-rose-400"
								onclick="createRecipe(${i}); openCreateBird(); closeBirdCards()"
							>
								Добавить рецепт
							</button>
						
							<button
								class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-400"
								onclick="edit(${i}); openCreateBird(); closeBirdCards()"
							>
								Изменить
							</button>

							<button
								class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-rose-700 rounded-lg hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-400"
								onclick="deleteData(${i})"
							>
								Удалить
							</button>
						</div>
					</div>`
			}

			document.getElementById("birdFormWithRecipes").innerHTML =
				birdCardWithRecipesForm
		}
	} else {
		openBirdCards()
		closeBirdWithRecipes()
	}
}

// Edit Forms
function openCreateBird() {
	document.getElementById("createForm").classList.remove("hidden")
}

function closeCreateBird() {
	document.getElementById("createForm").classList.add("hidden")
}

function openBirdCards() {
	document.getElementById("birdForm").classList.remove("hidden")
}

function closeBirdCards() {
	document.getElementById("birdForm").classList.add("hidden")
}

function openBirdWithRecipes() {
	document.getElementById("birdFormWithRecipes").classList.remove("hidden")
}

function closeBirdWithRecipes() {
	document.getElementById("birdFormWithRecipes").classList.add("hidden")
}

function addImage(imageUrl) {
	let regURL =
		/^(?:(?:https?|ftp|telnet):\/\/(?:[a-z0-9_-]{1,32}(?::[a-z0-9_-]{1,32})?@)?)?(?:(?:[a-z0-9-]{1,128}\.)+(?:com|net|org|mil|edu|arpa|ru|gov|biz|info|aero|inc|name|[a-z]{2})|(?!0)(?:(?!0[^.]|255)[0-9]{1,3}\.){3}(?!0|255)[0-9]{1,3})(?:\/[a-z0-9.,_@%&?+=\~\/-]*)?(?:#[^ \'\"&<>]*)?$/i
	return regURL.test(imageUrl)
}

// Cards
function card() {
	let birdCardForm = ``

	for (let i = 0; i < details.length; i++) {
		birdCardForm += `
			<div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md bg-gray-100 my-3">
				<img
					class="rounded-t-lg h-[223px] w-[335px]"
					src="${details[i].imageUrl}"
					alt=""
				/>
				<h5
					class="my-2 text-2xl font-bold tracking-tight text-slate-700 hover:text-slate-900 text-ellipsis overflow-hidden"
				>
					${details[i].name}
				</h5>

				<p
					class="mb-3 font-normal text-gray-700 dark:text-gray-400 overflow-y-auto h-32"
				>
					${details[i].description}
				</p>
					
				<a
					class="inline-flex items-center px-3 py-2 w-full text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer"
					onclick="recipeCard(${i})"
				>
					Список рецептов
					<svg
						aria-hidden="true"
						class="w-4 h-4 ml-2 -mr-1"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
							clip-rule="evenodd"
						></path>
					</svg>
				</a>

				<div class="flex flex-row justify-between mt-3">
					<button
						class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-rose-400"
						onclick="createRecipe(${i}); openCreateBird(); closeBirdCards()"
					>
						Добавить рецепт
					</button>
				
					<button
						class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-400"
						onclick="edit(${i}); openCreateBird(); closeBirdCards()"
					>
						Изменить
					</button>

					<button
						class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-rose-700 rounded-lg hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-400"
						onclick="deleteData(${i})"
					>
						Удалить
					</button>
				</div>
			</div>`
	}

	document.getElementById("birdForm").innerHTML = birdCardForm
}

function recipeCard(index) {
	let object = details[index].recipeArray
	let recipeCardForm = ``

	for (let i = 0; i < object.length; i++) {
		recipeCardForm += `
			<div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md bg-gray-100 my-3">
				<img
					class="rounded-t-lg h-[223px] w-[335px]"
					src="${object[i].recipeImageUrl}"
					alt=""
				/>
				<h5
					class="my-2 text-2xl font-bold tracking-tight text-slate-700 hover:text-slate-900 text-ellipsis overflow-hidden"
				>
					${object[i].recipeName}
				</h5>

				<p
					class="mb-3 font-normal text-gray-700 dark:text-gray-400 overflow-y-auto h-32"
				>
					${object[i].recipeText}
				</p>

				<div class="flex flex-row justify-between mt-3">
					<button
						class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-400"
						onclick="editRecipe(${index},${i}); openCreateBird(); closeBirdCards()"
					>
						Изменить
					</button>

					<button
						class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-rose-700 rounded-lg hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-400"
						onclick="deleteRecipe(${index},${i})"
					>
						Удалить
					</button>
				</div>
			</div>`
	}

	document.getElementById("birdForm").innerHTML = recipeCardForm
}

// Local Storage
getData()
card()

function getData() {
	let DataDet = localStorage.getItem("details")

	if (DataDet) {
		details = JSON.parse(DataDet)
	} else {
		setData()
	}
}

function setData() {
	localStorage.setItem("details", JSON.stringify(details))
}

// Bird functions
function save() {
	let name = document.getElementById("birdName")
	let desc = document.getElementById("birdDescription")
	let imgUrl = document.getElementById("file1")

	if (name.value.length < 3) {
		alert("Название должно иметь больше 3 букв!")
		name.value = ""
		desc.value = ""
		imgUrl.value = ""
		return
	}

	if (desc.value.length < 10 || desc.value.length > 100) {
		alert("Описание птицы не входит в лимит!")
		name.value = ""
		desc.value = ""
		imgUrl.value = ""
		return
	}

	if (!addImage(imgUrl.value) && imgUrl.value != "") {
		alert("Не верно указана ссылка на картинку")
		name.value = ""
		desc.value = ""
		imgUrl.value = ""
		return
	}

	if (imgUrl.value == "") {
		imgUrl.value = "https://img.icons8.com/pixels/512/experimental-bird-pix.png"
	}

	let data = {
		name: name.value,
		description: desc.value,
		imageUrl: imgUrl.value,
		recipeArray: [],
	}

	details.push(data)

	setData()
	card()

	name.value = ""
	desc.value = ""
	imgUrl.value = ""
}

function deleteData(index) {
	if (confirm("Вы точно хотите удалить?")) {
		details.splice(index, 1)
	}

	setData()
	card()
}

function edit(index) {
	let editForm = `
	<lable class="text-xl text-black opacity-70">
		Сслка на картинку:
		<input
			type="text"
			value="${details[index].imageUrl}"
			placeholder="Заголовок"
			class="mt-1 mx-0 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-sm outline-none placeholder: text-gray-700"
			id="newImageUrl"
		/>
	</lable>

	<div class="flex object-cover py-2 flex items-center justify-center w-full" id="imgSaveField">
		<img id="prevImg" src="${details[index].imageUrl}" class="w-full" />
	</div>

		<lable class="text-xl text-black opacity-70">
			Обновить именование птицы:
			<input
				type="text"
				value="${details[index].name}"
				placeholder="Заголовок"
				class="mt-1 mx-0 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-sm outline-none placeholder: text-gray-700"
				id="newBirdName"
			/>
		</lable>

		<lable class="text-xl text-black opacity-70">
			Обновить описание:
			<textarea
				class="mt-1 mx-0 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-sm outline-none resize-none h-40 placeholder: text-gray-700"
				id="newBirdDescription"
			>${details[index].description}</textarea>
		</lable>

		<div class="flex gap-8 items-center justify-center mt-4">
			<div
				class="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4 hover:bg-green-700"
				onclick="update(${index}); closeCreateBird(); openBirdCards()"
			>
				Обновить
			</div>
		</div>`

	document.getElementById("createForm").innerHTML = editForm
}

function update(index) {
	let newBirdName = document.getElementById("newBirdName")
	let newBirdDescription = document.getElementById("newBirdDescription")
	let newImageUrl = document.getElementById("newImageUrl")
	let getRecipes = details[index].recipeArray

	if (newBirdName.value.length < 3) {
		alert("Название должно иметь больше 3 букв!")
		newBirdName.value = ""
		newBirdDescription.value = ""
		newImageUrl.value = ""
		return
	}

	if (!addImage(newImageUrl.value) && newImageUrl.value != "") {
		alert("Не верно указана ссылка на картинку")
		newBirdName.value = ""
		newBirdDescription.value = ""
		newImageUrl.value = ""
		return
	}

	if (newImageUrl.value == "") {
		newImageUrl.value =
			"https://img.icons8.com/pixels/512/experimental-bird-pix.png"
	}

	details[index] = {
		name: newBirdName.value,
		description: newBirdDescription.value,
		imageUrl: newImageUrl.value,
		recipeArray: getRecipes,
	}

	setData()
	card()

	if (createFormEl) {
		createFormEl.innerHTML = createBirdForm
	}
}

function deleteRecipe(indexObj, indexRecipe) {
	if (confirm("Вы точно хотите удалить?")) {
		details[indexObj].recipeArray.splice(indexRecipe, 1)
	}

	setData()
	recipeCard(indexObj)
}

// Recipe functions
function editRecipe(indexObj, indexRecipe) {
	let editRecipeForm = `
		<lable class="text-xl text-black opacity-70">
		Сслка на картинку:
		<input
			type="text"
			value="${details[indexObj].recipeArray[indexRecipe].recipeImageUrl}"
			placeholder="Заголовок"
			class="mt-1 mx-0 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-sm outline-none placeholder: text-gray-700"
			id="newRecipeImageUrl"
		/>
	</lable>

	<div class="flex object-cover py-2 flex items-center justify-center w-full" id="imgSaveField">
		<img id="prevImg" src="${details[indexObj].recipeArray[indexRecipe].recipeImageUrl}" class="w-full" />
	</div>

		<lable class="text-xl text-black opacity-70">
			Обновить название рецепта:
			<input
				type="text"
				value="${details[indexObj].recipeArray[indexRecipe].recipeName}"
				placeholder="Заголовок"
				class="mt-1 mx-0 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-sm outline-none placeholder: text-gray-700"
				id="newRecipeName"
			/>
		</lable>

		<lable class="text-xl text-black opacity-70">
			Обновить рецепт приготовления:
			<textarea
				class="mt-1 mx-0 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-sm outline-none resize-none h-40 placeholder: text-gray-700"
				id="newRecipeText"
			>${details[indexObj].recipeArray[indexRecipe].recipeText}</textarea>
		</lable>

		<div class="flex gap-8 items-center justify-center mt-4">
			<div
				class="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4 hover:bg-green-700"
				onclick="updateRecipe(${indexObj}, ${indexRecipe}); closeCreateBird(); openBirdCards()"
			>
				Обновить
			</div>
		</div>`

	document.getElementById("createForm").innerHTML = editRecipeForm
}

function updateRecipe(indexObj, indexRecipe) {
	let newRecipeName = document.getElementById("newRecipeName")
	let newRecipeText = document.getElementById("newRecipeText")
	let newRecipeImageUrl = document.getElementById("newRecipeImageUrl")

	details[indexObj].recipeArray[indexRecipe].recipeName = newRecipeName.value
	details[indexObj].recipeArray[indexRecipe].recipeText = newRecipeText.value
	details[indexObj].recipeArray[indexRecipe].recipeImageUrl =
		newRecipeImageUrl.value

	setData()
	card()

	if (createFormEl) {
		createFormEl.innerHTML = createBirdForm
	}
}

function createRecipe(index) {
	let createRecipeForm = `
		<lable class="text-xl text-black opacity-70">
			Сслка на картинку:
			<input
				type="text"
				placeholder="Заголовок"
				class="mt-1 mx-0 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-sm outline-none placeholder: text-gray-700"
				id="recipeImageUrl"
			/>
		</lable>

		<div class="flex object-cover py-2 flex items-center justify-center w-full" id="imgSaveField">
			<img id="prevImg" class="w-full" />
		</div>

		<lable class="text-xl text-black opacity-70">
			Название рецепта:
			<input
				type="text"
				placeholder="Заголовок"
				class="mt-1 mx-0 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-sm outline-none placeholder: text-gray-700"
				id="recipeName"
			/>
		</lable>

		<lable class="text-xl text-black opacity-70">
			Инструкция приготовления:
			<textarea
				class="mt-1 mx-0 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-sm outline-none resize-none h-40 placeholder: text-gray-700"
				id="recipeText"
			></textarea>
		</lable>

		<div class="flex gap-8 items-center justify-center mt-4">
			<div
				class="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4 hover:bg-green-700"
				onclick="addRecipeForm(${index}); openBirdCards(); closeCreateBird();"
			>
				Добавить рецепт
			</div>
		</div>`

	document.getElementById("createForm").innerHTML = createRecipeForm
}

function addRecipeForm(index) {
	let createRecipeFormEl = document.getElementById("createRecipeForm")

	if (createRecipeFormEl) {
		createRecipeFormEl.innerHTML = createRecipeForm
	}

	let recipeName = document.getElementById("recipeName")
	let recipeText = document.getElementById("recipeText")
	let recipeImageUrl = document.getElementById("recipeImageUrl")

	if (recipeName.value.length < 3) {
		alert("Название должно иметь больше 3 букв!")
		recipeName.value = ""
		recipeText.value = ""
		recipeImageUrl.value = ""
		return
	}

	if (recipeText.value.length < 10 || recipeText.value.length > 100) {
		alert("Описание рецепта не входит в лимит (от 10 до 100 символов)!")
		recipeName.value = ""
		recipeText.value = ""
		recipeImageUrl.value = ""
		return
	}

	if (!addImage(recipeImageUrl.value) && recipeImageUrl.value != "") {
		alert("Не верно указана ссылка на картинку")
		recipeName.value = ""
		recipeText.value = ""
		recipeImageUrl.value = ""
		return
	}

	if (recipeImageUrl.value == "") {
		recipeImageUrl.value = "https://img.icons8.com/dotty/512/meal.png"
	}

	details[index].recipeArray.push({
		recipeName: recipeName.value,
		recipeText: recipeText.value,
		recipeImageUrl: recipeImageUrl.value,
	})

	setData()
	card()

	if (createFormEl) {
		createFormEl.innerHTML = createBirdForm
	}
}

// Sorted
function byFieldStart(field) {
	return (a, b) => (a[field] > b[field] ? 1 : -1)
}

function byFieldEnd(field) {
	return (a, b) => (a[field] > b[field] ? -1 : 1)
}

function sortCardsByStart() {
	details.sort(byFieldStart("name"))
	setData()
	card()

	if (createFormEl) {
		createFormEl.innerHTML = createBirdForm
	}
}

function sortCardsByEnd() {
	details.sort(byFieldEnd("name"))
	setData()
	card()

	if (createFormEl) {
		createFormEl.innerHTML = createBirdForm
	}
}
