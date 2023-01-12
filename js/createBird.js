export const createForm = () => {
	var createForm = `<label
					class="text-gray-800 py-2 bg-gray-400 font-medium flex items-center justify-center border-2 border-dotted rounded-md cursor-pointer"
				>
					Прикрепить изображение:
					<input type="file" class="hidden" />
				</label>
				<div class="flex object-cover py-2 flex items-center justify-center">
					IMAGE
				</div>

				<lable class="text-xl text-black opacity-70">
					Именование птицы:
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
				</lable>`

	return createForm
}
