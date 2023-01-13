/*var recipeForm = `
	<div class="w-full">
		<div
			class="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md bg-gray-100 my-3"
		>
			<label
				class="text-gray-800 py-2 bg-gray-400 font-medium flex items-center justify-center border-2 border-dotted rounded-md cursor-pointer"
			>
				Прикрепить изображение:
				<input type="file" class="hidden" />
			</label>

			<div
				class="flex object-cover py-2 flex items-center justify-center"
			>
				IMAGE
			</div>

			<lable class="text-xl text-black opacity-70">
				Название рецепта:
				<input
					type="text"
					placeholder="Заголовок"
					class="mt-1 mx-0 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-sm outline-none placeholder: text-gray-700"
				/>
			</lable>

			<lable class="text-xl text-black opacity-70">
				Описание:
				<textarea
					placeholder="Опис..."
					class="mt-1 mx-0 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-sm outline-none resize-none h-40 placeholder: text-gray-700"
				></textarea>
			</lable>
		</div>
	</div>` */

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

					<div class="items-center justify-end flex md:flex-1 lg:w-0">
						<button
							id="createBirdBtn"
							class="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 cursor-pointer"
							onclick="openCreateBird(); closeBirdCards()"
							>Создать птицу</button
						>
					</div>`

let createBirdForm = `
	<label
		class="text-gray-800 py-2 bg-gray-400 font-medium flex items-center justify-center border-2 border-dotted rounded-md cursor-pointer"
	>
		Прикрепить изображение:
		<input type="file" id="file1" class="hidden" onchange="addImage()"/>
	</label>

	<div class="flex object-cover py-2 flex items-center justify-center w-full" id="imgSaveField">
		<img id="prevImg" class="w-full" />
	</div>

	<lable class="text-xl text-black opacity-70">
		Именование птицы:
		<input
			type="text"
			placeholder="Заголовок"
			class="mt-1 mx-0 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-sm outline-none placeholder: text-gray-700"
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
					class="mb-2 text-2xl font-bold tracking-tight text-slate-700 hover:text-slate-900 text-ellipsis overflow-hidden"
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
					src="${object[i].imageUrl}"
					alt=""
				/>
				<h5
					class="mb-2 text-2xl font-bold tracking-tight text-slate-700 hover:text-slate-900 text-ellipsis overflow-hidden"
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
						onclick="editRecipe(${index},${i}); openCreateBird(); "
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

function addImage() {
	let f = file1.files[0]

	var fileReader = new FileReader()
	fileReader.onload = function () {
		prevImg.src = fileReader.result
	}

	fileReader.readAsDataURL(f)
}

function save() {
	let name = document.getElementById("birdName")
	let desc = document.getElementById("birdDescription")
	let f = file1.files[0]

	if (name.value == 0) {
		alert("Name is empty")
		return
	}

	let data = {
		name: name.value,
		description: desc.value,
		imageUrl: URL.createObjectURL(f),
		recipeArray: [],
	}

	details.push(data)

	setData()
	card()

	name.value = ""
	desc.value = ""
	prevImg.src = ""
}

function deleteData(index) {
	details.splice(index, 1)

	setData()
	card()
}

function deleteRecipe(indexObj, indexRecipe) {
	details[indexObj].recipeArray.splice(indexRecipe, 1)

	setData()
	recipeCard(indexObj)
}

function edit(index) {
	let editForm = `
		<label
			class="text-gray-800 py-2 bg-gray-400 font-medium flex items-center justify-center border-2 border-dotted rounded-md cursor-pointer"
		>
			Прикрепить изображение:
			<input type="file" id="file1" class="hidden" />
		</label>

		<div class="flex object-cover py-2 flex items-center justify-center">
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

function editRecipe(indexObj, indexRecipe) {
	let editRecipeForm = `
		<label
			class="text-gray-800 py-2 bg-gray-400 font-medium flex items-center justify-center border-2 border-dotted rounded-md cursor-pointer"
		>
			Прикрепить изображение:
			<input type="file" id="file1" class="hidden" />
		</label>

		<div class="flex object-cover py-2 flex items-center justify-center">
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

function update(index) {
	let newBirdName = document.getElementById("newBirdName")
	let newBirdDescription = document.getElementById("newBirdDescription")
	let f = file1.files[0]
	let getRecipes = details[index].recipeArray

	details[index] = {
		name: newBirdName.value,
		description: newBirdDescription.value,
		imageUrl: URL.createObjectURL(f),
		recipeArray: getRecipes,
	}

	setData()
	card()

	if (createFormEl) {
		createFormEl.innerHTML = createBirdForm
	}
}

function updateRecipe(indexObj, indexRecipe) {
	let newRecipeName = document.getElementById("newRecipeName").value
	let newRecipeText = document.getElementById("newRecipeText").value
	let f = file1.files[0]

	details[indexObj].recipeArray[indexRecipe].recipeName = newRecipeName
	details[indexObj].recipeArray[indexRecipe].recipeText = newRecipeText
	details[indexObj].recipeArray[indexRecipe].recipeImageUrl =
		URL.createObjectURL(f)

	setData()
	card()

	if (createFormEl) {
		createFormEl.innerHTML = createBirdForm
	}
}

function createRecipe(index) {
	let createRecipeForm = `
		<label
			class="text-gray-800 py-2 bg-gray-400 font-medium flex items-center justify-center border-2 border-dotted rounded-md cursor-pointer"
		>
			Прикрепить изображение:
			<input type="file" id="file1" class="hidden" onchange="addImage()"/>
		</label>

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
				onclick="addRecipeForm(${index}); openBirdCards(); closeCreateBird()"
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
	let f = file1.files[0]

	details[index].recipeArray.push({
		recipeName: recipeName.value,
		recipeText: recipeText.value,
		recipeImageUrl: URL.createObjectURL(f),
	})

	setData()
	card()

	if (createFormEl) {
		createFormEl.innerHTML = createBirdForm
	}
}
